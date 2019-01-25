var { Todo } = require('../server/models/todo');

const { ObjectID } = require('mongodb');
const { User } = require('./../server/models/user');
const { mongoose } = require('./../server/db/mongoose');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

Todo.findByIdAndRemove('5c4b1adb8a2d061e4178c227').then((todo)=>{
    console.log(todo);
});