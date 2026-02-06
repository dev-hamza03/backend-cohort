const express = require("express");

const app = express();
const connectToDb = require("./config/database");

connectToDb();

module.exports = app;