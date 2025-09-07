import React, { useState } from 'react';
import axios from 'axios';
import './register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://simple-authentication-system-backend-1.onrender.com/api/auth/register', {
                email,
                password
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className='regiter-container'>
            <form onSubmit={handleRegister} className='regiter-form'>
                <h2 className='register-form-head'>Register</h2>
                <div className='regiter-inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input
                    type="email"
                    placeholder="Email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className='regiter-inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input
                    type="password"
                    id='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button type="submit" className='regiter-button'>Register</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;