// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Socket.IO Setup (more on this later)
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*' // Change this later for security 
    }
});

// Routes (we'll define these soon)
// require('./routes/auth')(app);
// require('./routes/chat')(app, io); // Pass io to chat routes

// ... More setup and routes will come here
