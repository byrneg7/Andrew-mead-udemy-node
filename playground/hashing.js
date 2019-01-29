const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$DkiddfL5HaXOu3/EXpu8MeVuPk8knbzXhv1rRNes9K9YCEvR5kdOm'

bcrypt.compare(password, hashedPassword, (errr, res)=>{
    console.log(res);
});



// var data = {
//     id: 10
// };


//var token = jwt.sign(data, '123abc') //signs an objet - adds salt, generates the
// hash and returns the token value 
//console.log(token);

// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded)

// jwt.verify() //takes the token value and makes sure it wasn't manipulated


// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // var userIdString = (JSON.stringify(token.data));
// // console.log(`User ID stringified: ${userIdString}`)
// // console.log(`User ID stringified and hashed:\n ${SHA256(userIdString)}`)
// // console.log(`User ID stringified,salted and hashed:\n ${SHA256(userIdString+'abc')}`)


// // //client 4 might want to access client 5's data:
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// // //this client doesn't have access to the salt - so their changed hash wont match the server hash

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }
