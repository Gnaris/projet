const bcrypt = require('bcrypt');
const saltRounds = 10;

const password1 = '1'
const password2 = '2'
const password3 = '3'
const password4 = '4'
const password5 = '5'

bcrypt.hash(password1, saltRounds, (err, hash) => {
    console.log("password 1 : " + hash)
})
bcrypt.hash(password2, saltRounds, (err, hash) => {
    console.log("password 2 : " + hash)
})
bcrypt.hash(password3, saltRounds, (err, hash) => {
    console.log("password 3 : " + hash)
})
bcrypt.hash(password4, saltRounds, (err, hash) => {
    console.log("password 4 : " + hash)
})
bcrypt.hash(password5, saltRounds, (err, hash) => {
    console.log("password 5 : " + hash)
})
