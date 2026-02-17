const jwt = require("jsonwebtoken");

async function identifyUser(req,res, next) {
        const { jwt_token } = req.cookies;

    if (!jwt_token) {
        return res.status(401).json({
            message: "Token not provied, Inavlid accesss"
        });
    }

    let decoded = null;

    try {
        decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    req.user = decoded;

    next();
}

module.exports = identifyUser


