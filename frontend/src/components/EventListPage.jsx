// src/components/EventListPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventListPage() {
    const [events, setEvents] = useState([]);

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Handle event registration (implement registration logic later)
    const handleRegister = (eventId) => {
        alert(`Registered for event with ID: ${eventId}`);
        // Registration logic can be implemented here
    };

    return (
        <div className="event-list-page">
            <h2>All Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id} className="event-item">
                        <h3>{event.name}</h3>
                        <p><strong>Institute:</strong> {event.institute}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Fee:</strong> ${event.fee}</p>
                        <p><strong>Days Left:</strong> {event.daysLeft}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <button onClick={() => handleRegister(event._id)}>Register</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventListPage;
