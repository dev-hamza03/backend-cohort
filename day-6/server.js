const { default: mongoose } = require("mongoose");
const app = require("./src/app");

const momgoose = require("mongoose");

function connectToDb() {
    mongoose.connect("mongodb+srv://hamza:Cn5CZxOKvyn8oY9L@cluster0.mdsjogm.mongodb.net/day-6")
    .then(()=> {
        console.log("Connected to database");
    });
}

connectToDb();

app.listen(3000, () => {

    console.log("server is running on port 3000 ");
    
});