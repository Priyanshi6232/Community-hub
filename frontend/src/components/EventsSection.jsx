import React from 'react';

const EventsSection = () => {
  return (
    <section className="events-section">
      <h1>Upcoming Events...</h1>
      <div className="events-grid">
        <div className="event-card">
          <img src="./assets/event1.jpg" alt="Event 1" />
          <div className="event-card-content">
            <h3>Community Hackathon</h3>
            <p>Join us for an exciting weekend of coding, collaboration, and innovation!</p>
            <div className="event-info">
              <span className="date">Sep 15, 2024</span>
              <a href="#" className="cta-btn">Register</a>
            </div>
          </div>
        </div>
        <div className="event-card">
          <img src="./assets/event2.jpg" alt="Event 2" />
          <div className="event-card-content">
            <h3>Art & Craft Fair</h3>
            <p>Explore local art and craft at our annual fair. Fun for the whole family!</p>
            <div className="event-info">
              <span className="date">Oct 10, 2024</span>
              <a href="#" className="cta-btn">Learn More</a>
            </div>
          </div>
        </div>
        <div className="event-card">
          <img src="./assets/event3.webp" alt="Event 3" />
          <div className="event-card-content">
            <h3>Music Festival</h3>
            <p>Experience live performances from local bands and artists. Don’t miss out!</p>
            <div className="event-info">
              <span className="date">Nov 25, 2024</span>
              <a href="#" className="cta-btn">Get Tickets</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
