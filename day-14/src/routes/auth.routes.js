const express = require('express');
const userModel = require('../models/user.model')
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();


// ================= REGISTER =================
authRouter.post('/register', async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body

    try {
        // ✅ FIX: use $or instead of $nor
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        // ✅ FIX: correct hash (already correct in your latest)
        const hash = crypto.createHash("sha256").update(password).digest("hex")

        const user = await userModel.create({
            username,
            email,
            password: hash,
            bio,
            profileImage
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        // ✅ IMPROVED cookie
        res.cookie('jwt_token', token, {
            httpOnly: true,
            secure: true
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
});


// ================= LOGIN =================
authRouter.post('/login', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            // ✅ FIX: dot instead of comma
            return res.status(404).json({
                message: "User not found"
            })
        }

        const hash = crypto.createHash("sha256").update(password).digest("hex");

        const isPasswordValid = hash === user.password

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Password invalid"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("jwt_token", token, {
            httpOnly: true,
            secure: true
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
})


module.exports = authRouter