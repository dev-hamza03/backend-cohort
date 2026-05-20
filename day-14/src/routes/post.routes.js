const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/* post /api/posts (protected) */
postRouter.post("/", upload.single("image"), postController.createPostController)

/* get /api/posts (protected)*/
postRouter.get("/get-posts", postController.getPostController)

/* get /api/posts/details:postId (protected)*/
postRouter.get("/details/:postId",postController.getPostDetailsController)


module.exports = postRouter;