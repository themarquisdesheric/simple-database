const fs = require('fs');
const assert = require('assert');

describe('get object', () => {
  it('reads a file', done => {
    fs.readFile('./data/cats/fluffy.json', (err, data) => {
      const jsonData = JSON.parse(data);
      assert.deepEqual(jsonData, {'name': 'fluffy'});
      done();
    });
  });
});