const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: [true, "Token is required for blacklisting"]

    }
}, {
    timestamps: true
})

const blacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports = blacklistModel