const express = require("express");
const followController = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/auth.middleware");
const followRouter = express.Router();

// POST api/follow/:usernmae
followRouter.post("/:username", identifyUser, followController.followUserController);

// patch api/follow/accept/:username
followRouter.patch("/accept/:username", identifyUser, followController.acceptFollowRequestController)

// patch api/follow/accept/:username
followRouter.patch("/reject/:username", identifyUser, followController.rejectFollowRequestController)


// DELETE api/follow/unfollow:usernmae
followRouter.delete("/unfollow/:username", identifyUser, followController.unfollowUserController);


module.exports = followRouter;