const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((res)=>{
    //     console.log(res);
    // });

    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res)=>{
    //     console.log(res);
    // })

    // db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name: "Greg"}).then((res)=>{
    //    console.log('Deleted all users matching the query')
    // });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5c45f043c97dba65017b8034') })
        .then((res) => {
            console.log(`Removed user with ID: ${JSON.stringify(res, undefined, 2)}`)
        })

    //db.close();
});
