import express from 'express';
import Community from '../models/Community.js';

const router = express.Router();

// Create a new community
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCommunity = new Community({ name, description });
        await newCommunity.save();
        res.status(201).json(newCommunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating community', error: error.message });
    }
});

// Get all communities
router.get('/', async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching communities', error: error.message });
    }
});

// Get messages for a specific community
router.get('/:id/messages', async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }
        res.json(community.messages); // Assuming messages are an array in the community document
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

// Post a message to a specific community
router.post('/:id/messages', async (req, res) => {
    const { content, user } = req.body; // Assuming you're sending user info too
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        // Create a new message object
        const message = {
            content,
            user, // Add user info (e.g., userId, username)
            timestamp: new Date() // You can also include a timestamp if necessary
        };

        community.messages.push(message); // Assuming messages is an array in your community model
        await community.save();
        
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// router.post('/:id/join', async (req, res) => {
//     const { userId } = req.body; // Get user ID from the request body
//     try {
//         const community = await Community.findById(req.params.id);
//         if (!community) return res.status(404).json({ message: 'Community not found' });

//         // Check if user is already a member
//         if (!community.members.includes(userId)) {
//             community.members.push(userId);
//             await community.save();
//         }
//         res.status(200).json({ message: 'Successfully joined the community' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error joining community', error: error.message });
//     }
// });

router.post('/:communityId/join', async (req, res) => {
    const { communityId } = req.params;
    const { userId } = req.body; // Assuming userId is sent in the request body

    try {
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        // Add the user if they're not already a member
        if (!community.members.includes(userId)) {
            community.members.push(userId);
            await community.save();
            res.status(200).json({ message: 'You joined this channel' });
        } else {
            res.status(400).json({ message: 'User is already a member of this community' });
        }
    } catch (error) {
        console.error("Error joining community:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


export default router;
