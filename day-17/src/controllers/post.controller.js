const { default: ImageKit } = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");


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
        message: "Post created sucessfully",
        post
    });

}

module.exports = {
    createPostController
}