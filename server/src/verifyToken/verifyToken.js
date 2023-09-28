const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403); //403 code - not Authorized
            next()
        });
    } else {
        res.sendStatus(401);
    };
};

module.exports = verifyToken;
