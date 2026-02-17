const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/*
    api/posts [protected]
   - re.body = { caption, image-file }
*/

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController);


/* 
   GET /api/posts [protected]
*/
postRouter.get("/", identifyUser, postController.getPostController);


/* 
    GET api/posts/details:postId
    return a deatil about specifis posts with the id, also check whether the post belongs to the user that us reuested
*/

postRouter.get("/details/:postID", identifyUser, postController.getPostDetailsController)






module.exports = postRouter