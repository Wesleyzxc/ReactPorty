import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mainbar.css';
import * as serviceWorker from './serviceWorker';
import { Home, About } from './home';
import { LongPiano } from './piano';
import { FileHandler } from './fileHandler';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

document.title = 'Portfolioso 😋';

function App(props) {
    return (
        <Router>
            <div>
                {/* Div for main top bar for routing */}
                <ul>
                    <li>
                        <Link to={'/'} className="nav-link"> Home </Link>
                    </li>
                    <li>
                        <Link to={'/piano'} className="nav-link"> Piano </Link>
                    </li>
                    <li>
                        <Link to={'/about'} className="nav-link"> About </Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/piano" render={(props) => (<div><FileHandler /><LongPiano /> </div>)} />
                    <Route exact path="/about" component={About} />

                </Switch>
                {/* <FileHandler />
                <LongPiano /> */}
            </div>
        </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
