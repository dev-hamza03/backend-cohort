const ImageKit = require("@imagekit/nodejs").default;
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "cohort-2-insta-clone-posts"
    });


    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        userId: req.user.id
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });

};

async function getPostsController(req, res) {


    const userId = req.user.id

    const posts = await postModel.find({ userId });

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });

};

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.userId.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    res.status(200).json({
        message: "Post detals fatched successfully",
        post
    });
};

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController
}