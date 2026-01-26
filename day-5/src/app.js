const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

/* creating note using POST */
app.post("/notes", (req, res) => {
    console.log(req.body);

    notes.push(req.body);

    res.status(201).json({
        message: "note created successfully"
    });
});

/* fetch notes using GET */
app.get("/notes", (req, res) => {
    res.status(200).json({
        notes: notes
    });
});

/* Deleting notes using DELETE */
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];

    res.status(204).json({
        message: "note deleted successfully"
    })
});

/* updating the description of note using PATCH */
app.patch("/notes/:index" , (req,res) => {
    notes[req.params.index].description = req.body.description;

    res.status(200).json({
        message:"note updated successfully"
    });
});

module.exports = app;