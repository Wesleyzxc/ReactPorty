import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MenuBar } from './mainbar';
import * as serviceWorker from './serviceWorker';
import { LongPiano } from './piano';
import { FileHandler } from './fileHandler';
import Login from './Login';
import Popup from 'reactjs-popup';

document.title = 'Super Cool Website 😋';

function App(props) {
    const [popup, setPopup] = useState(false);
    const toggle = () => {
        setPopup(!popup);
        console.log(popup);
    };
    return (
        <div>
            <div>
                <MenuBar toggle={toggle} />
                <FileHandler />
                <LongPiano />
            </div>

            <div>
                {popup ? (
                    //TODO: Popup not working
                    //<Popup>
                    <div>
                        <Login />
                    </div>
                ) : //</Popup>
                    null}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
