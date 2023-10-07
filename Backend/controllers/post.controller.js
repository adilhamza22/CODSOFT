const Post = require('../model/Post.model');
const User = require('../model/User.model');
exports.getAllPublihsedPosts = async (req, res) => {
    try {
        const posts = await Post.find({ state: "published" });
        res.status(200).json({
            status: 'success',
            posts,
        });

    } catch (err) {
        throw err;
    }
};


exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).where("state").eq("published");
        if (!post) {
            res.status(404).json({
                status: 'fail',
                message: 'No post found with that ID',
            });
        }
        res.status(200).json({
            status: 'success',
            post,
        });
    } catch (err) {
        throw err;
    }

};

//create post 
exports.createPost = async (req, res) => {
    try {
        const {title,desc,body} = req.body;
        console.log(req.body.user);
        let {firstName,lastName} = req.body.user;
        // let firstName = req.user.firstName;
        // let lastName = req.user.lastName;
        // console.log(firstName);
        // console.log(lastName);
        // let firstName = req.user.firstName;
        // let lastName = req.user.lastName;
      
        let author = `${firstName} ${lastName}`;
        let authorId = req.body.user._id;
        const post = await Post.create({
            title,
            desc,
            body,
            author,
            authorId,
        });

        //find that user
        console.log(req.body.user._id);
        let user =  User.findById(req.body.user._id);
        console.log(user,"user");
        if (!user) {
            // handle error or return response indicating user not found
            res.status(404).json({
                status: 'fail',
                message: 'No user found with that ID',
            });
          }
        // let user = User.findById(req.body.user._id);
        //update their posts array
        if (!user.posts) {
            user.posts = [];
        }
        user.posts.push(post._id);
        // await User.save();
        await User.updateOne({_id: user._id}, {posts: user.posts});
        

        res.status(201).json({
            status: 'success',
            post,
        });


    } catch (err) {
        throw err;
    }
};

