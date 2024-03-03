const bcrypt = require('bcrypt');
const saltRounds = 10;

(async () => {
    const password1 = '1'
    const password2 = '1'
    let crypt1 = await bcrypt.hash(password1, 12);
    let crypt2 = await bcrypt.hash(password2, 12)

    console.log(crypt1)
    console.log(crypt2)

    bcrypt.compare('1', crypt1, (err, result) => {
        console.log(result)
    })

})()


// const password2 = '2'
// const password3 = '3'
// const password4 = '4'
// const password5 = '5'

// bcrypt.hash(password1, saltRounds, (err, hash) => {
//     console.log("password 1 : " + hash)
// })
// bcrypt.hash(password2, saltRounds, (err, hash) => {
//     console.log("password 2 : " + hash)
// })
// bcrypt.hash(password3, saltRounds, (err, hash) => {
//     console.log("password 3 : " + hash)
// })
// bcrypt.hash(password4, saltRounds, (err, hash) => {
//     console.log("password 4 : " + hash)
// })
// bcrypt.hash(password5, saltRounds, (err, hash) => {
//     console.log("password 5 : " + hash)
// })
