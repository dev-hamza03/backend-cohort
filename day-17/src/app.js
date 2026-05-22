const express = require("express");
const authRouter = require("../src/routes/auth.routes")
const postRouter = require("./routes/post.routes")
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());


// /api/auth   ---for auth API's
app.use("/api/auth", authRouter);

// /api/posts  ---for posts API's
app.use("/api/posts", postRouter);

module.exports = app;