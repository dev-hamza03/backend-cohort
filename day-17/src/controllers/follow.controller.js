const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // Can't follow yourself
    if (followerUsername === followeeUsername) {
        return res.status(409).json({
            message: "You can't follow yourself"
        });
    }

    // Check if target user exists
    const followeeExists = await userModel.findOne({
        username: followeeUsername
    });

    if (!followeeExists) {
        return res.status(404).json({
            message: "User does not exist"
        });
    }

    // Already following
    const acceptedFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    });

    if (acceptedFollow) {
        return res.status(409).json({
            message: `Already following ${followeeUsername}`
        });
    }

    // Request already pending
    const pendingRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    });

    if (pendingRequest) {
        return res.status(409).json({
            message: `Follow request already sent to ${followeeUsername}`
        });
    }

    // Re-send rejected request
    const rejectedRequest = await followModel.findOneAndUpdate(
        {
            follower: followerUsername,
            followee: followeeUsername,
            status: "rejected"
        },
        {
            status: "pending"
        },
        {
            returnDocument: "after"
        }
    );

    if (rejectedRequest) {
        return res.status(200).json({
            message: `Follow request sent again to ${followeeUsername}`,
            follow: rejectedRequest
        });
    }

    // Create new request
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    });

    return res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    });
};

async function acceptFollowRequestController(req, res) {
    const currentUsername = req.user.username
    const requestedUsername = req.params.username

    const followRecord = await followModel.findOneAndUpdate(
        {
            follower: requestedUsername,
            followee: currentUsername,
            status: "pending"
        },
        {
            status: "accepted"
        },
        {
            returnDocument: "after"
        }
    );

    if (!followRecord) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: `Accepted the request of ${requestedUsername}`,
        followRecord
    });
};

async function rejectFollowRequestController(req, res) {
    const currentUsername = req.user.username
    const requestedUsername = req.params.username

    const followRecord = await followModel.findOneAndUpdate(
        {
            follower: requestedUsername,
            followee: currentUsername,
            status: "pending"
        },
        {
            status: "rejected"
        },
        {
            returnDocument: "after"
        }
    );

    if (!followRecord) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: `Rejected the request of ${requestedUsername}`,
        followRecord
    });
};

async function unfollowUserController(req, res) {

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `User you are trying to unfollow does not exists`
        })
    }

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    });

    if (!isUserFollowing) {
        return res.status(404).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have successfully unfollowed ${followeeUsername}`
    });
};

module.exports = {
    followUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController
}