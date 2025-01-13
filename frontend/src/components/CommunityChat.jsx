import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import './CommunityChat.css';

function CommunityChat() {
    const { communityId } = useParams(); // Retrieve communityId from the URL
    const { user } = useUser(); // Access the logged-in user's data from context
    const [communityName, setCommunityName] = useState(""); // State for community name
    const [isMember, setIsMember] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/communities/${communityId}/messages`);
            setMessages(response.data.messages);
        } catch (error) {
            setError("Failed to load messages. Please try again later.");
        }
    };

    const fetchCommunityName = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/communities/${communityId}`);
            setCommunityName(response.data.name);
        } catch (error) {
            setError("Failed to load community details.");
        }
    };

    const checkMembership = async () => {
        if (!user || !user.id) return;

        try {
            const response = await axios.get(`http://localhost:8000/api/communities/${communityId}/is-member/${user.id}`);
            setIsMember(response.data.isMember);
        } catch (error) {
            setError("Error checking membership status. Please try again later.");
        }
    };

    useEffect(() => {
        if (communityId) {
            fetchMessages();
            fetchCommunityName();
            checkMembership();
        }
    }, [communityId, user]);

    const handleJoinCommunity = async () => {
        if (user && user.id) {
            try {
                await axios.post(`http://localhost:8000/api/communities/${communityId}/join`, {
                    userId: user.id,
                });
                setIsMember(true);
                fetchMessages();
            } catch (error) {
                console.error("Error joining community:", error);
                setError("Error joining the community. Please try again.");
            }
        } else {
            console.error("User not logged in");
            setError("You need to be logged in to join the community.");
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() && user && user.id) {
            try {
                await axios.post(`http://localhost:8000/api/communities/${communityId}/messages`, {
                    content: newMessage.trim(),
                    userId: user.id,
                });
                setNewMessage("");
                setError("");
                fetchMessages();
            } catch (error) {
                console.error("Error sending message:", error);
                setError("Error sending the message. Please try again.");
            }
        } else {
            setError("Message cannot be empty or you are not logged in.");
        }
    };

    if (!communityId) {
        return <p className="loading-text">Loading community data...</p>;
    }

    return (
        <div className="community-chat">
            <h2 className="chat-header">Chat for Community {communityName || communityId}</h2>
            {!isMember ? (
                <button className="join-button" onClick={handleJoinCommunity}>
                    Join
                </button>
            ) : (
                <p className="membership-status">You are already a member of this community</p>
            )}
            {error && <p className="error-text">{error}</p>}
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className="chat-message">
                        <strong>{msg.senderUsername|| "Unknown User"}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="input-field"
                />
                <button className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default CommunityChat;
