# Lab 1

Structure:

`getObject(<dir>, <table>, <id>, callback)`

Usage: 

`db.getObject('./data', 'cats', 'f1de5', callback)`

# Lab 2

Structure: 

```
db.save(<table>, <objectToSave>, callback)
  creates an _id property for the object
  saves the object in a file, where the filename is the _id. e.g. if the id is 12345, the file will be 12345.json
  returns objectToSave with added _id property

db.get(<table>, <id>, callback)
  returns the object from the requested table that has that id
  return null if that id does not exist

db.getAll(<table>, callback)
  returns array of all objects from the requested table
  return empty array [] when no objects
```

Usage: 

```
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