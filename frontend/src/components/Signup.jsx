import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Make the API request
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log(res); // Logging the response for debugging

            if (res?.data?.success) { // Use optional chaining to avoid errors
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: ""
                });
                navigate("/login");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
            // Better error handling
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <form onSubmit={signupHandler} style={{ 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                borderRadius: '8px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px', 
                backgroundColor: '#fff' 
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#111111' }}>Community Hub</h1>
                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
                        Signup for free
                    </p>
                </div>
                <div>
                    <label style={{ fontWeight: '500', color: '#4b5563' }}>Username</label>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            width: '100%',
                            padding: '8px',
                            marginTop: '4px',
                            outline: 'none',
                            backgroundColor:'#fff'
                        }}
                    />
                </div>
                <div>
                    <label style={{ fontWeight: '500', color: '#4b5563' }}>Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            width: '100%',
                            padding: '8px',
                            marginTop: '4px',
                            outline: 'none',
                            backgroundColor:'#fff'
                        }}
                    />
                </div>
                <div>
                    <label style={{ fontWeight: '500', color: '#4b5563' }}>Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        style={{
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            width: '100%',
                            padding: '8px',
                            marginTop: '4px',
                            outline: 'none',
                            backgroundColor:'#fff'
                        }}
                    />
                </div>
                {
    loading ? (
        <Button
            style={{
                backgroundColor: green, // Change this color to your desired loading state background color
                color: '#fff', // White text
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                borderRadius: '6px',
                width: '100%',
                cursor: 'not-allowed',
                opacity: '0.8'
            }}
        >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    ) : (
        <Button
            type="submit"
            style={{
                backgroundColor: '#000000', // Change this color to your desired normal state background color
                color: '#fff', // White text
                padding: '10px',
                borderRadius: '6px',
                width: '100%',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0f9c6b')} // Hover color
            onMouseOut={(e) => (e.target.style.backgroundColor = '#10B981')} // Normal state when hover is removed
        >
            Signup
        </Button>
    )
}

                <span style={{ textAlign: 'center' }}>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
    
}

export default Signup;
