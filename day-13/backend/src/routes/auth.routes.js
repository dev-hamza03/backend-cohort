const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlredyExist = await userModel.findOne({ email });

    if (isUserAlredyExist) {
        return res.status(409).json({
            message: "user already exists with this email"
        });
    };

    const user = await userModel.create({
        name, email, password
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
    console.log(req.cookies);

    res.status(200).json({
        message: "This is protected route"
    });
});

module.exports = authRouter;