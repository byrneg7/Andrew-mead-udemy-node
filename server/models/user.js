const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,   //makes it impossible to have 2 documents with the same value in a collection
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this; //gives access to the individual document

    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString() //signs object made from {current user, 'auth'} 
    user.tokens.push({ access, token }); //puts the token into the document

    return user.save().then(() => {
        return token; //make it return a promise
    });
};

//instance methods get called with the current document 
//model methods get called with the model as the this binding
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (err) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded,
        'tokens.token': token,   //quotes are required when we have a dot in the value
        'tokens.access': 'auth'
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User }

