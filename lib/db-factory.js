const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const mkdirp = require('mkdirp');

function dbFactory(rootDir) {

  return {
    get(table, id, callback) {
      const filepath = path.join(rootDir, table, id + '.json');
      
      fs.readFile(filepath, (err, data) => {
        if (err) return callback(err, null);
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      });
    },

    getAll(table, callback) {
      const dirPath = path.join(rootDir, table);
      fs.readdir(dirPath, (err, files) => {
        if (err) return callback(err);
        let count = files.length;
        let directoryContents = [];

        if (!count) callback(null, directoryContents);

        files.forEach(file => {
          let filePath = path.join(dirPath, file);
          fs.readFile(filePath, (err, data) => {
            if (err) return callback(err);
            let parsedFile = JSON.parse(data);
            directoryContents.push(parsedFile);
            count--;
            if (!count) callback(null, directoryContents);
          });
        });
      });
    },

    save(table, objectToSave, callback) {
      const id = shortid.generate();
      objectToSave._id = id;
      const filePath = path.join(rootDir, table, objectToSave._id + '.json');
      const dir = path.join(rootDir, table);

      mkdirp(dir, err => {
        if (err) return callback(err);
        fs.writeFile(filePath, JSON.stringify(objectToSave), err => {
          if (err) return callback(err);
          callback(null, objectToSave);
        });
      });
    },

    update(table, objectToUpdate, callback) {
      const id = objectToUpdate._id;
      const dirPath = path.join(rootDir, table);
      const filePath = path.join(rootDir, table, objectToUpdate._id + '.json');

      fs.readdir(dirPath, (err, data) => {
        if (data.indexOf(id + '.json') !== -1) {
          fs.writeFile(filePath, JSON.stringify(objectToUpdate), err => {
            if (err) return callback(err);

            this.get(table, objectToUpdate._id, (err, data) => {
              if (err) return callback(err);

              callback(null, data);
            });
          });
        } else {
          callback(new Error('Requested ID not found'));
        }
      });
    },

    // remove(table, id, callback) {

    // }

  };
}

module.exports = dbFactory;