// utils/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request 
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
