const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");


async function authUser(req, res, next) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).json({
            message: "Token not provided"
        })
    };

    const isTokenBlacklisted = await redis.get(accessToken)

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }


};

module.exports = {
    authUser
}