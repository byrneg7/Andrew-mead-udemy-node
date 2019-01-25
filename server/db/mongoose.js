var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

//export the configured mongoose variable
module.exports = {
    mongoose
}