const assert = require('assert');
const rimraf = require('rimraf');
const dbFactory = require('../lib/db-factory');

const TEST_DIR = './data';
const db = dbFactory(TEST_DIR);

const testCat1 = { name: 'testcat1', type: 'best'};
const testCat2 = { name: 'testcat2', type: 'bestcat'};
const testCat3 = { name: 'testcat3', type: 'bestcat'};
const testDog1 = { name: 'testDog1', type: 'dawg'};
const testDog2 = { name: 'testDog2', type: 'bestdawg'};
const testBear1 = { name: 'baobao', type: 'panda'};
const testBear2 = { name: 'newbear', type: 'pooh', _id: 'hkkkh3'};

describe('db', () => {

  before(done => {
    db.save('cats', testCat1, (err, cat) => {
      if (err) return done(err);
      testCat1._id = cat._id;
      done();
    });
  });

  before(done => {
    db.save('cats', testCat2, (err, cat) => {
      if (err) return done(err);
      testCat2._id = cat._id;
      done();
    });
  });

  before(done => {
    db.save('dogs', testDog1, (err, dog) => {
      if (err) return done(err);
      testDog1._id = dog._id;
      done();
    });
  });

  before(done => {
    db.save('dogs', testDog2, (err, dog) => {
      if (err) return done(err);
      testDog2._id = dog._id;
      done();
    });
  });

  describe('db.get()', () => {

    it('gets a cat given an id', done => {
      db.get('cats', testCat1._id, (err, cat) => {
        assert.equal(cat.name, testCat1.name);
        assert.equal(cat._id, testCat1._id);
        done();
      });
    });

    it('gets a cat given an id', done => {
      db.get('cats', testCat2._id, (err, cat) => {
        assert.equal(cat.name, testCat2.name);
        assert.equal(cat._id, testCat2._id);
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', testDog1._id, (err, dog) => {
        assert.equal(dog.name, testDog1.name);
        assert.equal(dog._id, testDog1._id);
        done();
      });
    });

    it('gets a dog given an id', done => {
      db.get('dogs', testDog2._id, (err, dog) => {
        assert.equal(dog.name, testDog2.name);
        assert.equal(dog._id, testDog2._id);
        done();
      });
    });

    it('returns null when it can\'t find an object with that id', done => {
      db.get('cats', 'doesnotexist', (err, cat) => {
        assert.equal(cat, null);
        done();
      });
    });
  });

  describe('db.save()', () => {

    before(done => {
      rimraf(TEST_DIR, err => {
        done(err);
      });
    });

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

    it('creates a directory if none exists', done => {
      db.save('bears', testBear1, (err, data) => {
        if (err) return done(err);
        db.get('bears', data._id, (err, bear) => {
          if (err) return done(err);
          assert.equal(bear.name, testBear1.name);
          done();
        });
      });
    });

  });

  describe('db.getAll()', () => {
    it('given a directory, returns an array of objects', done => {
      db.getAll('bears', (err, bears) => {
        if (err) return done(err);
        assert.equal(bears[0].name, 'baobao');
        done();
      });
    });
  });

  describe('db.getAll()', () => {
    before(done => {
      rimraf('./data/bears/*', err => {
        done(err);
      });
    });

    it('returns empty array when directory has no contents', done => {
      db.getAll('bears', (err, bears) => {
        if (err) return done(err);
        assert.deepEqual(bears, []);
        done();
      });
    });

    after(done => {
      db.save('bears', testBear1, (err) => {
        if (err) return done(err);
        delete testBear1._id;
        done();
      });
    });
  });

  describe('db.update()', () => {

    before(done => {
      db.save('cats', testCat3, (err, cat) => {
        if (err) return done(err);
        testCat3._id = cat._id;
        db.save('bears', testBear2, (err, bear) => {
          if (err) return done(err);
          testBear2._id = bear._id;
          done();
        });
      });
    });

    it('should read the id property of the object if it is found', done => {
      db.update('cats', testCat3, (err, cat) => {
        if (err) return done(err);
        assert.equal(cat._id, testCat3._id);
        done();
      });
    });

    it('should throw an error if object is not found', done => {
      db.update('bears', testBear1, (err) => {
        if (!err) return done(err);
        assert.equal(err, 'Error: Requested ID not found');
        done();
      });
    });

    it('should save the provided object as a new file', done => {
      testBear2.testProp = true;
      db.update('bears', testBear2, (err, bear) => {
        if (err) return done(err);
        assert.equal(bear.testProp, true);
        done();
      });
    });

    it('should return the object that was updated', done => {
      db.update('bears', testBear2, (err, bear) => {
        if (err) return done(err);
        assert.deepEqual(bear, testBear2);
        done();
      });
    });

  });

  describe('db.remove()', () => {

    before(done => {
      db.save('bears', testBear2, (err, bear) => {
        if (err) return done(err);
        testBear2._id = bear._id;
        done();
      });
    });

    it('should remove the object with given id from the table', done => {
      db.remove('bears', testBear2._id, (err) => {
        if (err) return done(err);
        db.get('bears', testBear2._id, (err) => {
          
          assert.equal(err, 'Error: Requested ID not found');
          done();
        });
      });
    });
  });

});