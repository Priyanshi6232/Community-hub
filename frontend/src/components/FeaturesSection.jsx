import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="section">
      <h2>Features</h2>
      <div className="card-row">
        <div className="card">
          <img src="https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/06/01161506/Seminar-Topics-for-CSE.jpg" alt="Forums" />
          <h3>Forums</h3>
          <p>Engage in discussions on various topics related to your field and interest.</p>
        </div>
        <div className="card">
          <img src="https://www.lsoft.com/news/issue6-2021/resources_648.jpg" alt="Resource Library" />
          <h3>Resource Library</h3>
          <p>Access a collection of useful resources, tutorials, and articles.</p>
        </div>
        <div className="card">
          <img src="https://www.aeries.com/wp-content/uploads/2024/05/Upcoming-Events.svg" alt="Events" />
          <h3>Events</h3>
          <p>Stay updated on upcoming events, webinars, and workshops.</p>
        </div>
        <div className="card">
          <img src="https://media.istockphoto.com/id/1359879029/vector/hybrid-team-colleagues-with-distant-online-video-call-tiny-person-concept-business-project.jpg?s=612x612&w=0&k=20&c=jxI1EWCEy7kQuyUTq_SojU0hGP2KYcdoGF-4HmLd8WY=" alt="Project Collaborations" />
          <h3>Project Collaborations</h3>
          <p>Find and join projects or start your own.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
