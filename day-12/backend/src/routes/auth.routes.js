const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists with this esmail"
        });
    };

    const user = await userModel.create({
        name, email, password
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_token", token);

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    });

});


module.exports = authRouter; 