import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage } from "./api";

const Chat = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch messages when the component mounts
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const fetchedMessages = await fetchMessages(receiverId);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error loading messages:", error);
            }
        };

        loadMessages();
    }, [receiverId]);

    // Handle sending a new message
    const handleSendMessage = async () => {
        try {
            const sentMessage = await sendMessage(receiverId, newMessage);
            setMessages([...messages, sentMessage]); // Add the new message to the state
            setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`message ${
                            message.senderUsername === "You" ? "sent" : "received"
                        }`}
                    >
                        <span className="username">{message.senderUsername}</span>
                        <p>{message.message}</p>
                        <span className="timestamp">
                            {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
