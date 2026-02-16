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

async function getPostController(req, res) {
    const { jwt_token } = req.cookies;

    if (!jwt_token) {
        return res.status(401).json({
            message: "Token not provided, Inavlid access"
        });
    }

    let decoded = null

    try {
        decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN)
    } catch (err) {
        return res.status(401).json({
            messsage: "Invalid token"
        });
    }

    const UserId = decoded.id;

    const posts = await postModel.find({
        user: UserId
    });

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    });
};

async function getPostDetailsController(req, res) {

    const { jwt_token } = req.cookies;

    if (!jwt_token) {
        return res.status(401).json({
            message: "Token not provied, Inavlid accesss"
        });
    }

    let decoded = null;

    try {
        decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const userId = decoded.id;
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