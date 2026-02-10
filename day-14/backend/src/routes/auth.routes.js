const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const userAlreadyExist = await userModel.findOne({ email });

    if (userAlreadyExist) {
        return res.status(409).json({
            message: "user already exists"
        });
    };

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name, email, password: hash
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_TOKEN
    )

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    });
});

authRouter.post("/protected", (req, res) => {
    const { jwt_token } = req.cookies;

    console.log(jwt_token);

    res.status(200).json({
        message: "this is protected route"
    });
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "user not found wuth this email address"
        });
    };

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "invalid password"
        });
    };

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_TOKEN
    );

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "user logged in successfullyƒ",
        user
    });
});


module.exports = authRouter