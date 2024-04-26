const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = ()=> {
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(()=> console.log('Mongo connected on ${dbURL}'))
    .catch( err => console.log('Connetion has error ${err}'))

    process.on('SIGINT', ()=> {
        mongoose.connection.close (()=>{
            console.log('Mongo is disconnected');
            process.exit(0)
        });
    });
}