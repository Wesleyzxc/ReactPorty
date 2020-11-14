import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import * as serviceWorker from "./serviceWorker";
import { Home, About } from "./home";
import { LongPiano } from "./piano";
import { Timer } from "./timer";
import { Recording } from "./recording.js";
import { FileHandler } from "./fileHandler";
import { Container } from "react-bootstrap";

import ReactGA from "react-ga";

import AppBar from "@material-ui/core/AppBar";
import { Tabs, Tab } from "@material-ui/core";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import "./index.css";

document.title = "Wesley's Portfolio";

// Google Analytics
ReactGA.initialize("UA-159364795-1");
ReactGA.pageview("/");

// primary theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1565c0",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const routes = [
  { path: "/ReactPorty", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/piano", name: "Piano", Component: PianoPage },
  { path: "/timer", name: "Timer", Component: Timer },
  { path: "/recording", name: "Recording", Component: Recording },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    display: "flex",
  },
}));

function MaterialTopBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.buttons} indicatorColor="primary">
            {routes.map((route) => (
              <Tab key={route.name} label={route.name} component={Link} to={route.path}></Tab>
            ))}
          </Tabs>
        </AppBar>
      </div>
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
    <ThemeProvider theme={theme}>
      <Router>
        <Redirect from="/" to="/ReactPorty"></Redirect>
        <MaterialTopBar></MaterialTopBar>
        <Container className="container">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition value={path} in={match != null} timeout={500} classNames="page" unmountOnExit>
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Container>
      </Router>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
