// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const { user, logout } = useUser();
    console.log("User:"+user); 

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">Community Hub</Link>
                </div>
                <ul className="nav-links">
                    <li className="middle"><a href="#communities">Communities</a></li>
                    <li className="middle"><a href="#about">About</a></li>
                    <li className="middle"><a href="#services">Services</a></li>
                </ul>
                <ul className="nav-links1">
                    <li><Link to="/communities" className="special-link">Create a Community</Link></li>
                    <li><Link to="/events">Events</Link></li>

                    {user ? (
                        <>
                            <li className="user-info">
                                <FaUserCircle size={24} />
                                <span>{user.username}</span>
                            </li>
                            <li>
                                <button onClick={logout} className="logout-button">Logout</button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/signup" className="signup-button">Sign Up/Log In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
