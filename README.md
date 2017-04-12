# Lab 1

In today's lab, we implemented a mock database with two cats and two dogs. We then wrote a `getObject` function which returned the requested animal, or `null` if none was found. Testing was done via Mocha. 

Structure:

`getObject(<dir>, <table>, <id>, callback)`

Usage: 

```
getObject('./data', 'cats', 'f1de5', callback)
getObject('./data', 'dogs', '39dkj7', callback)
```

