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

# Lab 3

Structure: 

```
.update(<table>, <objectToUpdate>, callback)
  reads the _id property from the object (error if it is not found):
  saves the provided object as the new file
  returns objectToUpdate

.remove(<table>, <id>, callback)
  removes the object from the requested table that has that id
  return { removed: true } if the object was removed, else return { removed: false } if the object did not exist
```

Usage: 

```
db.update('bears', testBear2, (err, bear) => {
  if (err) return console.log(err);
  console.log('got bear', bear);
});

db.remove('bears', 'khkh3k3', (err) => {
  if (err) return console.log(err);
  console.log('removed!');
});
```