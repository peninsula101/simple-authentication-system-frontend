import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('https://simple-authentication-system-backend-1.onrender.com/api/auth/check-session', {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []); 

    const handleLogout = async () => {
        try {
            await axios.post('https://simple-authentication-system-backend-1.onrender.com/api/auth/logout', {}, {
                withCredentials: true
            });
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // loading message 
    if (isLoading) {
        return <div className="loading-container">
            <h1 className='main-head'>Loading...</h1>
        </div>;
    }

    // Main app 
    return (
        <div>
            <h1 className='main-head'>Authentication Flow</h1>
            {!isAuthenticated ? (
                <div>
                    {!showRegister ? (
                        <>
                            <Login setIsAuthenticated={setIsAuthenticated} />
                            <p className='another-info'>Don't have an account? <button className='register-login-btn' onClick={() => setShowRegister(true)}>Register</button></p>
                        </>
                    ) : (
                        <>
                            <Register />
                            <p className='another-info'>Already have an account? <button className='register-login-btn' onClick={() => setShowRegister(false)}>Login</button></p>
                        </>
                    )}
                </div>
            ) : (
                <Dashboard handleLogout={handleLogout} />
            )}
        </div>
    );
};

export default App;