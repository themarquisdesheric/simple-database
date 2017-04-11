const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/db');

describe('get object', () => {
  it('gets an object given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fluffy', 
        '_id': 'f1de5'
      });
      done();
    });
  });
});