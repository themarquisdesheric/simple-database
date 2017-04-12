const fs = require('fs');
const assert = require('assert');
const getObject = require('../lib/lab');

describe('get object', () => {

  it('gets a cat given an id', done => {
    getObject('./data', 'cats', 'f1de5', (err, data) => {
      assert.deepEqual(data, {
        'name': 'fluffy', 
        '_id': 'f1de5'
      });
      done();
    });
  });

  it('gets a cat given an id', done => {
    getObject('./data', 'cats', '5khkh4', (err, data) => {
      assert.deepEqual(data, {
        'name': 'sparky', 
        '_id': '5khkh4'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', '39dkj7', (err, data) => {
      assert.deepEqual(data, {
        'name': 'pooch', 
        '_id': '39dkj7'
      });
      done();
    });
  });

  it('gets a dog given an id', done => {
    getObject('./data', 'dogs', 'hk333', (err, data) => {
      assert.deepEqual(data, {
        'name': 'doggy', 
        '_id': 'hk333'
      });
      done();
    });
  });

  it('returns null when it can\'t find an object with that id', done => {
    getObject('./data', 'cats', 'doesnotexist', (err, data) => {
      assert.equal(data, null);
      done();
    });
  });
});