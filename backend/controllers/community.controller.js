// controllers/communityController.js

import Community from "../models/community.model.js";
export const createCommunity = async (req, res) => {
    console.log("Cookies:", req.cookies); // Log cookies to check if the token is present
    console.log("User object:", req.user); // Log req.user to see if it's populated
    try {
        const { name, description } = req.body;

        // Check for required fields
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide both name and description."
            });
        }

        // Create new community instance
        const newCommunity = new Community({
            name,
            description,
            creator: req.user.id,  // Assuming req.user is set by isAuthenticated middleware
            members: [req.user.id] // Add the creator as the first member
        });

        // Save to database
        const savedCommunity = await newCommunity.save();

        // Return the success response
        return res.status(201).json({
            success: true,
            message: "Community created successfully!",
            community: savedCommunity
        });
    } catch (error) {
        console.error("Error creating community:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};