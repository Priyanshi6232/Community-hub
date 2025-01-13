import React from 'react';

function EventDetails({ event }) {
    return (
        <div className="event-details">
            <h2>{event.name}</h2>
            <p>Institute: {event.institute}</p>
            <p>Location: {event.location}</p>
            <p>Fee: {event.fee === 0 ? "Free" : `₹ ${event.fee}`}</p>
            <p>Impressions: {event.impressions}</p>
            <p>Days Left: {event.daysLeft}</p>
            <p>Category: {event.category.join(", ")}</p>
            <p>Participation Type: {event.participationType}</p>
            <p>Online: {event.isOnline ? "Yes" : "No"}</p>
            <p>Updated On: {new Date(event.updatedOn).toLocaleDateString()}</p>
        </div>
    );
}

export default EventDetails;
