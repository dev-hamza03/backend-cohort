
const userModel = require('../models/user.model')
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $nor: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({   // ✅ FIXED
            message: "User not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordvalid = hash === user.password

    if (!isPasswordvalid) {
        return res.status(401).json({
            message: "Password invalid"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}




module.exports = {
    registerController,
    loginController
}