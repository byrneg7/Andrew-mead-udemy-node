const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').find({_id: new ObjectID('5c4718abaf7eaf911aef9c19')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);

    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });


    db.collection('Users').find({ name: 'Greg' }).toArray().then((docs) => {
        console.log(`There are ${docs.length} user(s) matching the query:`);
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });
    //db.close();
});



//query the users, look for users with name=greg 
//print them to the screen 