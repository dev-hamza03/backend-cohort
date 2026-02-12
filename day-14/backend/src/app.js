const express = require("express");
const cookiePparser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");

const app = express();
app.use(cookiePparser());
app.use(express.json());
app.use("/api/auth", authRouter);

module.exports = app;