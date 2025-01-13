import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import createCommunity from "./routes/community.route.js";
import Event from "./models/Event.js";
import communityRoute from "./routes/community.route.js";
import Community from "./models/Community.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Ensure to use this before your routes
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:5173", // Update with your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// Root endpoint
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Backend successfully connected",
        success: true,
    });
});

// API endpoints for events
app.post("/api/events", async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to get user profile
app.get("/api/v1/user/me", isAuthenticated, (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ user: req.user });
});
app.get('/api/communities/:communityId/is-member/:userId', async (req, res) => {
    const { communityId, userId } = req.params;

    // Example logic to check if user is a member
    const community = await Community.findById(communityId); // Assuming you are using a DB like MongoDB
    if (!community) {
        return res.status(404).json({ message: "Community not found" });
    }

    const isMember = community.members.includes(userId); // Assuming `members` is an array of userIds

    res.json({ isMember });
});

// Get messages for a specific community
app.get("/api/communities/:id/messages", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: "Community ID is required" });
    }
  
    try {
      const community = await Community.findById(id).populate("messages.user", "username");
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
      res.json({ name: community.name, messages: community.messages });
    } catch (error) {
      console.error("Error fetching community messages:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// Get specific community details
app.get("/api/communities/:id", async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        res.json(community);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get joined communities for a user
app.get("/api/users/:userId/joined-communities", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate("joinedCommunities");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.joinedCommunities);
    } catch (error) {
        console.error("Error fetching joined communities:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Join a community
app.post("/api/communities/:communityId/join", async (req, res) => {
    const { communityId } = req.params;
    const { userId } = req.body;

    if (!communityId || !userId) {
        return res.status(400).json({ message: "Community ID and User ID are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already a member
        if (user.joinedCommunities.includes(communityId)) {
            return res.status(400).json({ message: "Already joined this community" });
        }

        user.joinedCommunities.push(communityId);
        await user.save();

        res.status(200).json({
            message: "Successfully joined community",
            joinedCommunities: user.joinedCommunities,
        });
    } catch (error) {
        console.error("Error joining community:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate("joinedCommunities");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                joinedCommunities: user.joinedCommunities,
            },
        });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Register other routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/community", createCommunity);
app.use("/api/communities", communityRoute);

// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`App is listening at port ${port}`);
});
