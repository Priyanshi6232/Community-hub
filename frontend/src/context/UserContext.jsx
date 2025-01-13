import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children, loadingComponent = <div>Loading...</div> }) => {
    const [user, setUser] = useState(null); // Represent logged-in user state
    const [loading, setLoading] = useState(true); // Manage async data fetch state
    const [error, setError] = useState(null); // Manage error state

    // Fetch user data when the provider mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/user/me', {
                    withCredentials: true, // Send credentials (e.g., cookies)
                });

                if (response.data && response.data.user) {
                    setUser(response.data.user); // Set user data from API response
                } else {
                    console.warn('No user data found in response');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.'); // Set error state
            } finally {
                setLoading(false); // Stop loading spinner once fetch completes
            }
        };

        fetchUserData();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
                withCredentials: true, // Ensure credentials are sent
            });
            setUser(null); // Clear user data
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Failed to log out. Please try again.');
        }
    };

    // Context provider value
    const contextValue = {
        user,
        loading,
        error,
        setUser,
        logout,
    };

    // Render loading component or children
    return (
        <UserContext.Provider value={contextValue}>
            {loading ? loadingComponent : children}
        </UserContext.Provider>
    );
};
