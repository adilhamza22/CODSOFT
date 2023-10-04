const Post = require('../model/Post.model');
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