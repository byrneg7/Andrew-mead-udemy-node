const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c45ef0722a1b5642d60c8a3')
    // },
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     }, {
    //         returnOriginal: false
    //     })
    //     .then((result) => {
    //         console.log(result)
    //     })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c473cd48b39c44c6e6448f9')
    },
        {
            $set: {
                name: 'Jenny'
            },
            $inc: {
                age: +1
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result)
        })

    //db.close();
});



//change jens name 
//use increment operator to increase age by 1