import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/login', { email, password }, {
                withCredentials: true, // Ensure cookies are sent with the request
            });

            console.log('Login successful:', response.data);
            
            // Handle successful login here (e.g., redirect or update state)
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Something went wrong!');
            console.error('Login failed:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
