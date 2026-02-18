const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");


/* 
   @route. post api/users/follow?:userId
   @description follow a user
   @access private
*/

userRouter.post("/follow/:username", identifyUser, userController.followUserController);

/* 
   @route. delete api/users/follow?:userId
   @description unfollow a user
   @access private
*/
userRouter.delete("/unfollow/:username", identifyUser,userController.unfollwoUserController);

module.exports = userRouter;