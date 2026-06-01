const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// requireing routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const followRouter = require("./routes/follow.routes");

// using routes
// /api/auth   ---for auth API's
app.use("/api/auth", authRouter);

// /api/posts  ---for posts API's
app.use("/api/posts", postRouter);

// api/follow. ---for follow API's
app.use("/api/follow", followRouter)

module.exports = app;