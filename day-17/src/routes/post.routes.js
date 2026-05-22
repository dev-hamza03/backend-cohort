const express = require("express");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


// Post /api/auth ( protected )
postRouter.post("/", identifyUser, upload.single("image"), postController.createPostController);

module.exports = postRouter;