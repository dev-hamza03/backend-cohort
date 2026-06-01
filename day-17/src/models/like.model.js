const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post id required for creating an post"]
    },
    user: {
        type: String,
        required: [true, "Username required for creating an post"]
    }
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;