const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

/*
    api/posts [protected]
   - re.body = { caption, image-file }
*/

postRouter.post("/",upload.single("image"), postController.createPostController);







module.exports = postRouter