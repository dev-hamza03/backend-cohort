const express = require("express");
const followController = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/auth.middleware");
const followRouter = express.Router();

// POST api/follow
followRouter.post("/:username", identifyUser, followController.followUserController);

// DELETE api/follow/unfollow
followRouter.delete("/unfollow/:username",identifyUser,followController.unfollowUserController);


module.exports = followRouter;