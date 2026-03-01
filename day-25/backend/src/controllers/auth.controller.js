const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function registerController(req, res) {
    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User with this email or username already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("accessToken", token)

    res.status(201).json({
        user: {
            id: user._id,
            username: user.username,
            email: email
        }
    })
};



module.exports = {
    registerController
}