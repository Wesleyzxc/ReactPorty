import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
// Routing tutorial & auth https://blog.strapi.io/protected-routes-and-authentication-with-react-and-node-js/
const login = (props) => {
    // Usestates not working
    const [email, setEmail] = useState(''); // State of email input box
    const [password, setPassword] = useState(''); // State of password input box

    // Handles change of contents in email input box
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    // Handles change of contents in email input box
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <div align="center" />

            <div align="center">
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    style={{ fontSize: '20px' }}
                />
            </div>
            <br />
            <div align="center" />

            <div align="center">
                <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Password"
                    style={{ fontSize: '20px' }}
                />
            </div>
            <br />
            <div align="center">
                <button className="LoginButton">Login</button>
                <br />
                <button className="SignUpButton">Sign Up</button>
                <p />
            </div>
        </div>
    );
};

export default login;
