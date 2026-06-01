const express = require("express");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


// POST /api/posts/ ( protected )
postRouter.post("/", identifyUser, upload.single("image"), postController.createPostController);

// GET api/posts/get-posts { protected }
postRouter.get("/get-posts", identifyUser, postController.getPostsController);

// GEt /api/post/details/:postId { protected }
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

// POST /api/post/like:PostId
postRouter.post("/like/:postId", identifyUser, postController.likePostController)


module.exports = postRouter;