import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MenuBar } from './mainbar.js';
import * as serviceWorker from './serviceWorker';
import { LongPiano } from './piano.js';

document.title = 'Super Cool Website 😋';

function App() {
    return (
        <div>
            <MenuBar />
            <div>This is my app</div>
            <LongPiano />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
