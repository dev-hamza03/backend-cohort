const express = require("express");
const userModel = require("../models/user.model");

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

    res.status(201).json({
        message: "user registered successfully",
        user
    });
})

module.exports = authRouter;