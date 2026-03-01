const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to database")
    } catch (error) {
        console.log("failed to connect to database");
    }
}

module.exports = connectToDb