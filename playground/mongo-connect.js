//use mongo client to connect to a mongo server
//const MongoClient = require('mongodb').MongoClient

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // mongo automatically creates the Todos database if we call it
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    //insert new doc into Users collection
    // .insertOne{name:     , age:    , location:     }

    // db.collection('Users').insertOne({
    //     name: 'Greg',
    //     age: 25,
    //     location: 'Dublin'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    db.close();
});



