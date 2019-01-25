var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()) // middleware for parsing json posts

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});


app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

//get /totos/123456
//fetch the url id - make it dynamic

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Can\'t find user with ID entered.');
        }
        res.status(200).send({todo})
    }, (err) => { console.log(err) }).catch((err) => {
        res.status(400).send();
    });
});


module.exports = { app };

