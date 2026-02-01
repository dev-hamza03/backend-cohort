const express = require("express");
const noteModel = require("./models/nodes.model");

const app = express();

app.use(express.json());

/* Post notes */
app.post("/notes", async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description
    });

    res.status(201).json({
        message: "note created successfully",
        note
    });
});

/* GET notes */
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    });
})

module.exports = app;