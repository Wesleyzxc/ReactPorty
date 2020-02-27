import React from "react";
import "./index.css";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  box: {
    textAlign: "center"
  }
}));

export function Home() {
  const classes = useStyles();
  return (
    <div className="paras">
      <h2 style={{ textAlign: "center" }}>About me</h2>
      <Box className={classes.box}>
        QUT Student from 2018-2020 as a Bachelor Of IT (Computer Science)
        student. I also study Data-centric Computing and (Networks and Security)
        as my minor.
      </Box>
      <ul>
        <li>
          <a href="https://github.com/Wesleyzxc">GitHub</a>
        </li>
      </ul>
    </div>
  );
}

export function About() {
  return <div className="paras">hi i love things</div>;
}
