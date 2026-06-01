const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { username, email, password, profileImage, bio } = req.body

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (userAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    };

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        profileImage,
        bio
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        }
    })

};

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    };


    const isPasswordvalid = await bcrypt.compare(password, user.password)

    if (!isPasswordvalid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    };

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User loggedIn sccessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
};

module.exports = {
    registerController,
    loginController
}