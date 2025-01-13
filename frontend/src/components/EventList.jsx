// src/components/EventList.jsx
import React from 'react';
import './EventList.css';

function EventList({ events = [], onSelect, onHostEventClick }) {
    if (!Array.isArray(events)) {
        return <p className="no-events">Error loading events.</p>;
    }

    const handleRegister = (eventName) => {
        alert(`You have been registered for ${eventName}!`);
    };

    return (
        <>
            <div className='top'>
                <h1>All Upcoming Events</h1>
                <button className='addevent' onClick={onHostEventClick}>Host an Event</button>
            </div>
            <div>
            <ul className='unordered-list'>
                {events.length > 0 ? (
                    events.map((event) => (
                        <li key={event._id} onClick={() => onSelect(event)} className='list'>
                            <h3>{event.name}</h3>
                            <p><strong>Institute:</strong> {event.institute}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Fee:</strong> ${event.fee}</p>
                            <p><strong>Days Left:</strong> {event.daysLeft}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <button
                                className="register-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents triggering onSelect
                                    handleRegister(event.name);
                                }}
                            >
                                Register
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="no-events">No events available.</p>
                )}
            </ul>
            </div>
        </>
    );
}

export default EventList;
