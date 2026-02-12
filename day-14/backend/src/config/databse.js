const mongoose = require("mongoose");


async function connectToDb() {
    mongoose.connect(process.env.MONGO_URI);

    console.log("Connted to database");
}

module.exports = connectToDb