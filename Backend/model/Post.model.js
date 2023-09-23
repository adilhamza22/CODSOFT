const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    
},{timestamps:true}
);

const Post = mongoose.model('Post',PostSchema);