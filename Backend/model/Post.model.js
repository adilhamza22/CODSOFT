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
    body:{
        type:String,
        required:true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    image:{
        type:String,
        // required:true,
    },
    
},{timestamps:true}
);

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;