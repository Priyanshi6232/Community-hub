import React, { useState } from 'react';
import axios from 'axios';
import './AddEvent.css';

function AddEvent({ onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        institute: '',
        fee: 0,
        impressions: 0,
        daysLeft: 0,
        category: '',
        location: '',
        participationType: '',
        isOnline: false,
        updatedOn: new Date(),
        description: '', // Added description field
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/events', formData);
            onAdd(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Host An Event</h2>
            <input name="name" placeholder="Event Name" onChange={handleChange} required />
            <input name="institute" placeholder="Institute" onChange={handleChange} required />
            <input name="fee" type="number" placeholder="Fee" onChange={handleChange} />
            <input name="impressions" type="number" placeholder="Impressions" onChange={handleChange} />
            <input name="daysLeft" type="number" placeholder="Days Left" onChange={handleChange} />
            <input name="category" placeholder="Category" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <select name="participationType" onChange={handleChange}>
                <option value="">Select Participation Type</option>
                <option value="individual">Individual</option>
                <option value="team">Team</option>
            </select>
            <label>
                Online Event:
                <input name="isOnline" type="checkbox" onChange={handleChange} />
            </label>
            <textarea 
                name="description" 
                placeholder="Event Description" 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Add Event</button>
        </form>
    );
}

export default AddEvent;
