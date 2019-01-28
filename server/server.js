require('./config')

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT;

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


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //this only takes the text and completed properties, we dont want users to alter other properties 

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});


app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Can\'t find user with ID entered.');
        }
        res.status(200).send({ todo })
    }).catch((err) => {
        res.status(400).send();
    });
});


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Can\'t find todo with ID entered.');
        }
        res.status(200).send({ todo })
    }).catch((err) => {
        res.status(400).send();
    });
});


//POST users
//_.pick email and password to get body variable, pass into the schema.


app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('X-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});





module.exports = { app };

