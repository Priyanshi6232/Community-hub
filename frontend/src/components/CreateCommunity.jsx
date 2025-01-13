// CreateCommunity.jsx

import React, { useState } from 'react';
import axios from 'axios';

function CreateCommunity({ onCommunityCreated }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/communities', {
                name,
                description,
            });
            setSuccess('Community created successfully!');
            setError('');
            
            // Call the parent callback to refresh community list, if provided
            if (onCommunityCreated) {
                onCommunityCreated(response.data);
            }

            // Clear form fields
            setName('');
            setDescription('');
        } catch (err) {
            setError('Failed to create community. Please try again.');
            setSuccess('');
            console.error(err);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError('');
        setSuccess('');
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setError('');
        setSuccess('');
    };

    return (
        <div>
            <h2>Create a New Community</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Community Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <button type="submit">Create Community</button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateCommunity;
