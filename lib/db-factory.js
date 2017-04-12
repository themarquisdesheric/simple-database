const fs = require('fs');
const path = require('path');

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

    }
  };
}

module.exports = dbFactory;