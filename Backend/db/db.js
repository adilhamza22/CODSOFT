const mongoose= require('mongoose');
const CONFIG = require('../config/config');

function connectToDB(){
    mongoose.connect(CONFIG.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connection.on('connected',()=>{
        console.log('Connected to MongoDB');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Error connecting to MongoDB',err);
    })

}

module.exports = connectToDB;