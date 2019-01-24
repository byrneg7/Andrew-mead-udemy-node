const { ObjectID } = require('mongodb');
const { User } = require('./../server/models/user');
const { mongoose } = require('./../server/db/mongoose');

var id = '5c487cb6e16bc62506686fc3'

if (!ObjectID.isValid(id)) {
    return console.log('ID not valid');
} else {
    User.findById(id).then((user) => {
        if (!user) {
            return console.log('A user with that ID doesn\'t exist.');
        };
        console.log(JSON.stringify(user, undefined, 2));
    }, (err) => { console.log(err); });
};







// const { Todo } = require('./../server/models/todo');

// var id = '5c49b6ccaa385c270830b84c';

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todo.find() : ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo.findOne : ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('A document with that ID cannot be found.');
//     }
//     console.log('Todo.findByID : ', todo);
// }).catch((err)=> console.log(err));
