const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {

    const { jwt_token } = req.cookies

    if (!jwt_token) {
        return res.status(401).json({
            message: "Token not provided, unauthorized accesss"
        });
    };

    let decoded = null;

    try {
        decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test",
        folder: "cohort-2-insta-clone"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgURL: file.url,
        user: decoded.id
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    })

};


module.exports = {
    createPostController
}