const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

/* 
create notes
 */
app.post("/notes", (req, res) => {
    console.log(req.body);

    notes.push(req.body);

    res.send("note created");
});

/* get notes */
app.get("/notes", (req, res) => {
    res.send(notes);
});

/* Delete notes */
/* params */
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];

    res.send("note deleted successfully");
});

/* PATCG /notes/:index */
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description;

    res.send("note updates successfully"); 
})

module.exports = app;