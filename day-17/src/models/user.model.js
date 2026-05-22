const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profileImage: {
        type: String,
        default: "vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp"
    },
    bio: String
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;