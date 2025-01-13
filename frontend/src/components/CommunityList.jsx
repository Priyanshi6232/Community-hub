import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CreateCommunity from './CreateCommunity';

function CommunitiesList() {
    const { user, loading } = useContext(UserContext);
    const [communities, setCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]); // List of joined communities
    const [showCreateCommunity, setShowCreateCommunity] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Show loading or access check
    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (!user) {
        return <p>Please log in to view communities.</p>;
    }

    const userId = user.id; // Replace with actual user ID from context

    useEffect(() => {
        // Fetch all communities
        const fetchCommunities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/communities');
                setCommunities(response.data);
            } catch (error) {
                console.log('Error fetching communities:', error);
            }
        };

        // Fetch joined communities
        const fetchJoinedCommunities = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${userId}/joined-communities`);
                const joinedIds = response.data.map((community) => community._id); // Extract community IDs
                setJoinedCommunities(joinedIds);
            } catch (error) {
                console.log('Error fetching joined communities:', error);
            }
        };

        fetchCommunities();
        fetchJoinedCommunities();
    }, [userId]);

    const handleJoin = async (communityId) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/communities/${communityId}/join`, {
                userId: userId,
            });
            setJoinedCommunities([...joinedCommunities, communityId]); // Update joined communities
            alert(response.data.message); // Confirmation message
        } catch (error) {
            console.log('Error joining community:', error);
            alert(error.response?.data?.message || 'Error joining community');
        }
    };

    const handleCreateCommunityClick = () => {
        setShowCreateCommunity(true);
    };

    const handleCommunityCreated = (newCommunity) => {
        // Add newly created community to the list
        setCommunities([...communities, newCommunity]);
        setShowCreateCommunity(false); // Close the create community form
    };

    const handleChatRedirect = (communityId) => {
        navigate(`/communities/${communityId}/chat`); // Redirect to chat page
    };

    return (
        <div>
            <div className="comm-top">
                <h1>Communities For You!!!</h1>
                <button onClick={handleCreateCommunityClick}>Create Your Community</button>
            </div>

            {showCreateCommunity && <CreateCommunity onCommunityCreated={handleCommunityCreated} />}

            {communities.map((community) => (
                <div key={community._id} style={{ marginBottom: '10px' }} className="community">
                    <div>
                    <h3>{community.name}</h3>
                    <p>{community.description}</p>
                    </div>
                    <div className="community-actions">
                        {joinedCommunities.includes(community._id) ? (
                            <button
                                className="chat-button"
                                onClick={() => handleChatRedirect(community._id)}
                            >
                                Chat
                            </button>
                        ) : (
                            <button
                                onClick={() => handleJoin(community._id)}
                                className="join-button"
                            >
                                Join
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunitiesList;
