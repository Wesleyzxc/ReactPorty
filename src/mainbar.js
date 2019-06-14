import React from 'react';
import './mainbar.css';

export function MenuBar() {
    return (
        <div>
            <ul>
                <li>
                    <a href="default.asp">Home</a>
                </li>
                <li>
                    <a href="news.asp">News</a>
                </li>
                <li>
                    <a href="contact.asp">Contact</a>
                </li>
                <li>
                    <a href="about.asp">About</a>
                </li>
                <li>
                    <a href="login.asp">Log Out</a>
                </li>
            </ul>
        </div>
    );
}
