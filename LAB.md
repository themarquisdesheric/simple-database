<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Simple Database Part 1: Three Tested Async Functions
===

## Doc/Resources
* [Node fs docs](https://nodejs.org/api/fs.html) - specifically the methods `readFile` and `writeFile`

* JSON [stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 
and [parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
* Checkout `mkdirp` and `rimraf` on `npm`

## Description:

In this first part of the assignment, create a factory module (a module that exports a function that can be called
with configuration arguments to create a certain type of return object) that takes the name of an initial directory
and returns an object with three asynchronous methods (functions on an obect) that 
are the start of a very simplistic database.

Use json as a file format to store (serialized and deserialized) javascript objects.

**You are strongly encouraged to pair on this assignment**

## Testing

You should use TDD to drive the implementation. Note that these are mostly E2E (end to end) tests, but we will use the 
basic structure of mocha's testing ability.

The setup for the test can be difficult as we want to ensure the tests start with a "clean" file directory **(hint: this is where `rimraf` will come in handy)** You will want to read about [Mocha's before/after hooks](https://mochajs.org/#hooks)

Initially, you can inspect the file system in your tests. 

Your tests will need to handle asynchronous calls.  You will need to read about [Mocha and async support](https://mochajs.org/#asynchronous-code)

### Bonus

See if you can evolve your tests to not test the implementation (file system write), but rather use the logically
connection between the three functions to test their respective actions.


## Requirements/Guidelines

Your db should offer the following methods:

* `.save(<table>, <objectToSave>, callback)`
  * creates a `_id` property for the object
  * saves the object in a file, where the filename is the `_id`. e.g. if the id is 12345, the file will be 12345.json
  * returns `objectToSave` with added `_id` property
* `.get(<table>, <id>, callback)`
  * returns the object from the requested table that has that id
  * return `null` if that id does not exist
* `.getAll(<table>, callback)`
  * returns array of all objects from the requested table
  * return empty array `[]` when no objects


Here is an example of how your module might be imported (required) and used:

```js
const makeDb = require('./db-factory');

const db = makeDb('./data');

db.save('cats', { name: 'garfield' }, (err, cat) => {
  
    if(err) return console.log('ERROR', err);
    
    const id = cat._id;
    
    db.get('cats', id, (err, cat) => {
      if(err) return console.log('ERROR', err);
      console.log('got cat', cat);
    } 
});

db.getAll('cats', (err, cats) => {
  if(err) return console.log('ERROR', err);
  console.log('we have', cats.length, 'cats');
});
```


* Use an npm package to find a library to assign id's (there are tons), e.g. [shortid](https://www.npmjs.com/package/shortid) or [uuid](https://www.npmjs.com/package/uuid)
* Use the supplied table name as a folder to store objects, and use the id as the file name:

  ```
  ---+ data
     |
     +--+ cats
        |
        +---* 34fdr5.json
        |
        +---* 65rej5.json
        |
        +---* 93odb2.json
  ```
      
* Use `JSON.parse` and `JSON.stringify` to move from javascript object to file representation
* You should have `package.json` with all scripts and dependecies

Standard repository/dev stuff: README, package.json, travis-ci, tests, meaningful commits, named npm scripts, etc.

## Rubric:

* Tests: 3pts
* Async Coding: 3pts
* Functional Correct Behavior: 2pts
* Project (Module) Organization: 2pts
