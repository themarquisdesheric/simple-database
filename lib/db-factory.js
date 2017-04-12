const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

function dbFactory(rootDir) {

  return {
    get(table, id, callback) {
      const filepath = path.join(rootDir, table, id + '.json');
      fs.readFile(filepath, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      });
    },
    getAll(table, callback) {
      
    },
    save(table, object, callback) {
      const id = shortid.generate();
      object._id = id;
      const filePath = path.join(rootDir, table, object._id + 'json');
      fs.writeFile(filePath, JSON.stringify(object), err => {
        if (err) return callback(err);
        callback(null, object);
      });
    }
  };
}

module.exports = dbFactory;