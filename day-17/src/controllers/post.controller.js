const { default: ImageKit } = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {

    const userId = req.user.id

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "cohort-2-insta-clone"
    });

    const post = await postModel.create({
        imageUrl: file.url,
        caption: req.body.caption,
        userId: userId
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });

};

async function getPostsController(req, res) {
    const userId = req.user.id

    const posts = await postModel.find({
        userId: userId
    });

    if (posts.length === 0) {
        return res.status(404).json({
            message: "No posts found"
        })
    }

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
};

async function getPostDetailsController(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.userId.toHexString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    res.status(200).json({
        message: "Post fectched successfuly",
        post
    })
};

async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isAlreadyLiked = await likeModel.findOne({
        user: username,
        post: postId
    });

    if (isAlreadyLiked) {
        return res.status(409).json({
            message:"Already liked this post"
        })
    }

    const like = await likeModel.create({
        user: username,
        post: postId
    });

    res.status(201).json({
        message: "Post liked successfully",
        like
    })
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController
}