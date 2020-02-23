import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./mainbar.css";
import { Transition } from "react-transition-group";
import * as serviceWorker from "./serviceWorker";
import { Home, About } from "./home";
import { LongPiano } from "./piano";
import { FileHandler } from "./fileHandler";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

document.title = "A guys's portfolio";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/piano", name: "Piano", component: PianoPage }
];

function TopBar(props) {
  return (
    <ul className="topbar">
      {routes.map(route => (
        <li className="topbar">
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}

function PianoPage(props) {
  return (
    <div>
      <FileHandler />
      <LongPiano />{" "}
    </div>
  );
}

function App(props) {
  return (
    <Router>
      <div>
        <TopBar />
        <Switch>
          {routes.map(route => (
            <Route exact path={route.path} component={route.component} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
