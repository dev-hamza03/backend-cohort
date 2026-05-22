const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Image is requied for creating an post"]
    },
    caption: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User Id is required fot creating an post"]
    }
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;