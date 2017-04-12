const assert = require('assert');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

describe('db', () => {
  describe('db.get()', () => {

    it('gets a cat given an id', done => {
      db.get('cats', 'f1de5', (err, data) => {
        assert.deepEqual(data, {
          'name': 'fluffy', 
          '_id': 'f1de5'
        });
        done();
      });
    });

    it('gets a cat given an id', done => {
      db.get('cats', '5khkh4', (err, data) => {
        assert.deepEqual(data, {
          'name': 'sparky', 
          '_id': '5khkh4'
        });
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', '39dkj7', (err, data) => {
        assert.deepEqual(data, {
          'name': 'pooch', 
          '_id': '39dkj7'
        });
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', 'hk333', (err, data) => {
        assert.deepEqual(data, {
          'name': 'doggy', 
          '_id': 'hk333'
        });
        done();
      });
    });

    it('returns null when it can\'t find an object with that id', done => {
      db.get('cats', 'doesnotexist', (err, data) => {
        assert.equal(data, null);
        done();
      });
    });
  });

  describe('db.save', () => {

    it('saves the data in a file and returns that object with a generated id', done => {
      const maru = {
        name: 'maru',
        type: 'scottish fold'
      };

      db.save('cats', maru, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat.name, maru.name);
        assert.ok(cat._id);
        done();
      });
    });

  });

});