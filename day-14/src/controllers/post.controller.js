const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorised access"
        })
    }


    let decoded = null; 

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "User not authorised"
        })
    }


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "cohort-2-insta-clone-posts"
    });


    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        userId: decoded.id
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });

};

module.exports = {
    createPostController
}