const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

/*
    api/posts [protected]
   - re.body = { caption, image-file }
*/

postRouter.post("/", upload.single("image"), postController.createPostController);


/* 
   GET /api/posts [protected]
*/
postRouter.get("/", postController.getPostController);


/* 
    GET api/posts/details:postId
    return a deatil about specifis posts with the id, also check whether the post belongs to the user that us reuested
*/

postRouter.get("/details/:postID", postController.getPostDetailsController)






module.exports = postRouter