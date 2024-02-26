// routes/chat.js
// ... imports
const Message = require('../models/Message');

// Assuming messages are for one-on-one chats, and the other user's ID is in the route 
router.get('/messages/:otherUserId', authMiddleware, async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const currentUserId = req.user.id;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        });

        res.json(messages);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
