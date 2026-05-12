const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Usernmae is reuired"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Emailƒ is reuired"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/vmvulshcs/vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp?updatedAt=1770891561606"
    }
});

const userModel = mongoose.model("users", userSchema);


module.exports = userModel