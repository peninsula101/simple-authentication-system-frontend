import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'

const Dashboard = ({ handleLogout }) => {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('https://simple-authentication-system-backend-1.onrender.com/api/dashboard', {
                    withCredentials: true
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.message || 'Could not fetch dashboard data.');
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className='dashboard-container'>
            <h2 className='dashboard-head'>Dashboard</h2>
            <p className='dashboard-message'>{message}</p>
            <button onClick={handleLogout} className='dashboard-button'>Logout</button>
        </div>
    );
};

export default Dashboard;