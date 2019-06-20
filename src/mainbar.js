import React, { useState } from 'react';
import './mainbar.css';
import Login from './Login';
import Popup from 'reactjs-popup';

export function MenuBar(props) {
    return (
        <div>
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
                        <button onClick={props.toggle}>Log in</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
