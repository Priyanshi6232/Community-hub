import React from 'react';
import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
                withCredentials: true,  // Ensures that the cookie is sent with the request
            });

            console.log(response.data.message);  // Log the success message
            // Redirect or update the state based on successful logout
        } catch (err) {
            console.error('Logout failed:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
};

export default Logout;
