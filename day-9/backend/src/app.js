const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("./public"));

/* POST API/notes */
/* create new note and save in databse */
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    console.log(title, description)

    const note = await noteModel.create({
        title, description
    });

    res.status(201).json({
        message: "note created successfuly",
        note
    });
});

/* GET API/notes */
/* FETCH ALL THE NOTES from mongoDB and send them in reponse */
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "notes fetched successfuly",
        notes
    });
});

/* DELETE API/notes?:index */
/* Delete note with the id from req.params */
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "note deleted successfully"
    });
});

/* PATCH API/notes/:id */
/* update the description of the notes */
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(201).json({
        message: "note description updated successfully"
    });
});

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
});

module.exports = app;