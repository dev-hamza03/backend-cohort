const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "UserId is required for creating an post"]
    },
    caption: String,
    imageUrl: {
        type: String,
        required: [true, "Image is required for creating an post"]
    }
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;