const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/* post /api/posts (protected) */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

/* get /api/posts (protected)*/
postRouter.get("/get-posts", identifyUser, postController.getPostsController)

/* get /api/posts/details:postId (protected)*/


module.exports = postRouter;