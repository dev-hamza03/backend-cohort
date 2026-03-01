const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User with this username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists"],
        required: [true, "Email is required"]
    },
    password: String
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;

