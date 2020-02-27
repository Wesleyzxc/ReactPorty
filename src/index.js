import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import * as serviceWorker from "./serviceWorker";
import { Home, About } from "./home";
import { LongPiano } from "./piano";
import { FileHandler } from "./fileHandler";
import { Container, Navbar, Nav } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

document.title = "A guys's portfolio";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/piano", name: "Piano", Component: PianoPage }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  buttons: {
    display: "flex"
  }
}));

function MaterialTopBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.buttons}
          indicatorColor="primary"
        >
          {routes.map(route => (
            <Tab label={route.name} component={Link} to={route.path}></Tab>
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
function PianoPage(props) {
  return (
    <div>
      <FileHandler />
      <LongPiano />
    </div>
  );
}

function App(props) {
  return (
    <Router>
      <MaterialTopBar></MaterialTopBar>
      <Container className="container">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={500}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  {console.log(match)}
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </Container>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
