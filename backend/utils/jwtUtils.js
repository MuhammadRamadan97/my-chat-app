// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Load from your .env file

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        // You can add any other user data if needed
    };

    const options = { expiresIn: '1h' }; // Token expires in an hour

    return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = generateToken;
