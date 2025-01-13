import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';

import './App.css';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Info from './components/Info';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import GetInvolvedSection from './components/GetInvolvedSection';
import SearchBar from './components/SearchBar';
import EventsSection from './components/EventsSection';
import Signup from './components/Signup';
import Login from './components/Login';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import AddEvent from './components/AddEvent';
import EventListPage from './components/EventListPage';
import CommunityPage from './components/CommunityPage';
import CreateCommunity from './components/CreateCommunity';
import CommunityList from './components/CommunityList';
import CommunityChat from './components/CommunityChat';

function App() {
  const location = useLocation();
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => setSelectedEvent(event);
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowAddEventForm(false);
  };

  const shouldShowHeader = () => {
    const noHeaderRoutes = ['/community-chat', '/create-community', '/events'];
    return !noHeaderRoutes.some(route => location.pathname.startsWith(route));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      {shouldShowHeader() && <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <Info />
            <div className="container">
              <AboutSection />
              <FeaturesSection />
              <GetInvolvedSection />
            </div>
            <SearchBar />
            <EventsSection />
          </>
        } />

        <Route path="/events" element={
          <div className="events-page">
            {showAddEventForm ? (
              <AddEvent onAdd={handleAddEvent} />
            ) : (
              <EventList events={events} onSelect={handleSelectEvent} onHostEventClick={() => setShowAddEventForm(true)} />
            )}
            <div className="event-details">
              {selectedEvent ? <EventDetails event={selectedEvent} /> : <p>Select an event to see details</p>}
            </div>
          </div>
        } />

        <Route path="/communities" element={<CommunityList />} />
        <Route path="/allEvents" element={<EventListPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community/:communityId" element={<CommunityPage />} />
        <Route path="/create-community" element={<CreateCommunity />} />
        <Route path="/communities/:communityId/chat" element={<CommunityChat />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}
