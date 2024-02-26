// routes/auth.js

// ... imports
const express = require('express');
const router = express.Router();
const generateToken = require('../utils/jwtUtils');

// We'll import user model and other utilities later
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists 
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Password hashing happens automatically thanks to the Mongoose middleware

        const newUser = new User({ username, password });
        const savedUser = await newUser.save();

        // Generate JWT
        const token = generateToken(savedUser);

        res.json({ message: 'Registration successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = generateToken(user);

        res.json({ message: 'Login successful', token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
