const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test",
        folder: "cohort-2-insta-clone"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgURL: file.url,
        user: req.user.id
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    })

};

async function getPostController(req, res) {

    const UserId = req.user.id

    const posts = await postModel.find({
        user: UserId
    });

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    });
};

async function getPostDetailsController(req, res) {


    const userId = req.user.id
    const postId = req.params.postID;

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        });
    };

    const isvalidUser = post.user.toString() === userId

    if (!isvalidUser) {
        return res.status(403).json({
            message: "Forbidden content"
        });
    };

    res.status(200).json({
        message: "post fetched successfully",
        post
    });
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}