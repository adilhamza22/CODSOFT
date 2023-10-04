const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'User must have a firstname'],
    },
    lastName:{
        type:String,
        required:[true,'User must have a lastname'],
    },
    email:{
        type:String,
        required:[true,'User must have an email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email'],
    },
    password:{
        type:String,
        required:[true,'User must have a password'],
    },
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }
});


// add pre hook to hash password before saving

UserSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
});

// compare passwords method

UserSchema.methods.isvalidPassword = async function(currPassword,storedPassword){
    return await bcrypt.compare(currPassword,storedPassword);
};

const User = mongoose.model('User',UserSchema);
module.exports = User;