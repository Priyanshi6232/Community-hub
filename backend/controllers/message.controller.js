import { Conversation } from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";  // Import the User model

// for chatting
    export const sendMessage = async (req, res) => {
        try {
            console.log('sendMessage function triggered');
            const senderId = req.id; // ID of the logged-in user
            const receiverId = req.params.id; // ID of the recipient
            const { textMessage: message } = req.body; // The message content from the request body
    
            // Check if a conversation between the sender and receiver already exists
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate({
                path: 'messages',
                populate: {
                    path: 'senderId', // Populate senderId field from User model
                    select: 'username' // Only select the username field
                }
            });
    
            if (!conversation) {
                // Create the conversation if it doesn't exist
                conversation = new Conversation({
                    participants: [senderId, receiverId]
                });
                await conversation.save();
            }
    
            // Create the new message
            const newMessage = new Message({
                conversationId: conversation._id,
                senderId,
                receiverId,
                message
            });
    
            // Save the new message
            await newMessage.save();
    
            // Add the new message to the conversation's messages array
            conversation.messages.push(newMessage._id);
            await conversation.save();
    
            // Fetch sender details (optional, if needed for response)
            const senderDetails = await User.findById(senderId).select('username profilePicture'); // You can select more fields here if needed
    
            // Real-time socket.io notification to the recipient
            const receiverSocketId = getReceiverSocketId(receiverId); // Get the receiver's socket ID
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', {
                    message: newMessage.message,
                    senderId: newMessage.senderId,
                    senderUsername: senderDetails.username,  // Added sender's username
                    senderProfilePicture: senderDetails.profilePicture, // Added sender's profile picture
                    conversationId: newMessage.conversationId,
                    createdAt: newMessage.createdAt
                });
            }
    
            // Respond with the new message details
            return res.status(201).json({
                success: true,
                message: "Message sent successfully",
                newMessage,
                senderDetails // Added sender details in the response
            });
    
        } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    };
    
    export const getMessage = async (req, res) => {
        
        try {
            const senderId = req.id; // ID of the logged-in user
            const receiverId = req.params.id; // ID of the recipient
            
    
            // Find the conversation and populate the messages
            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate({
                path: 'messages',
                populate: {
                    path: 'senderId', // Populate the senderId field with user details
                    select: 'username' // Select more fields if needed
                }
            });
    
            // Log the populated conversation to check messages and senderId
            console.log('Populated Conversation:', conversation);
            console.log('Messages:', conversation ? conversation.messages : 'No conversation found');
    
            // If no conversation is found, return an empty array
            if (!conversation) {
                return res.status(200).json({ success: true, messages: [] });
            }
            
    
            // Send additional details if necessary
            const messagesWithSenderDetails = conversation.messages.map(message => ({
                ...message.toObject(),
                sender: message.senderId // Directly embedding the sender details in each message
            }));
    
            return res.status(200).json({ success: true, messages: messagesWithSenderDetails });
    
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    };
    