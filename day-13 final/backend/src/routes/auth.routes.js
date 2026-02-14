const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();



authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user alreday exits with this email"
        });
    };

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        name, email, password: hash
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_TOKEN, { expiresIn: "1h" }
    )

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
});


authRouter.post("/get-me", async (req, res) => {
    const { jwt_token } = req.cookies

    const decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN);

    const user = await userModel.findById(decoded.id);

    res.json({
        name: user.name,
        email: user.email
    });
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(404).json({
            message: "user not found"
        });
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordMatched = hash === user.password;

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        });
    };

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_TOKEN, { expiresIn: ("1h") }
    )

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            name: user.name,
            email: user.email
        }
    });
});

module.exports = authRouter;