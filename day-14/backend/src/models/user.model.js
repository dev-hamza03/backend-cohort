const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "User name already sxists"],
        require: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        require: [true, "Emailis required"]
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/vmvulshcs/vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp"
    }
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;