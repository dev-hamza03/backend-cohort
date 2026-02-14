const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        required: [true, "imgURL is required for creating a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User id is required for creating a post"]
    }
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
