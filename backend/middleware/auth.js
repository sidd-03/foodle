const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                error: "Authorization denied due to lack of token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);      // decoding the token based on JWT secret

        if (!decoded) {
            return res.status(401).json({
                error: "Token is not valid",
            });
        }

        req.user = decoded.id;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: "Authorization denied due to token expiry",
            });
        }
        
        res.status(500).json({
            error: err
        });
    }
}

module.exports = auth;