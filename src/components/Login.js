import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://simple-authentication-system-backend-1.onrender.com/api/auth/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            setMessage(response.data.message);
            setIsAuthenticated(true);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred during login.');
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleLogin} className='form'>
                <h2 className='form-head'>Login</h2>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    placeholder="Email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    placeholder="Password"
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button type="submit" className='button'>Login</button>
            {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;