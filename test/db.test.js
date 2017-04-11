const fs = require('fs');
const assert = require('assert');

describe('get object', () => {
  it('reads a file', done => {
    fs.readFile('./data/test.txt', (err, data) => {
      assert.equal(data, 'test');
      done();
    });
    console.log('hello');
  });
});