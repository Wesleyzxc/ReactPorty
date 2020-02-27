import React from "react";
import "./index.css";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  box: {
    textAlign: "center"
  },
  image: {
    display: "flex"
  },
  CompanyTitle: {
    display: "flex",
    fontStyle: "italic",
    fontWeight: 600,
    justifyContent: "space-around"
  },
  companyInfo: {
    padding: "10px",
    marginRight: "5px",
    marginBottom: "20px",
    boxShadow: "5px 5px 5px 1px lightgrey"
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

const companyDeets = [
  {
    companyName: "Yuens Market Trading Co - Casual",
    workDuration: "March 2018 - Present",
    fileName: "yuens",
    text:
      "● Saved hundreds of man hours by creating automated processes for migration and cleaning of data to new system.\n● Carried out database management in managing tens of daily customer orders against warehouse inventory and amend faults in inventory list without mistake.\n● Managing multiple aisle of supermarket inventory with customer support and in warehouse quality control."
  },

  {
    companyName: "QUT - Project Assistant",
    workDuration: "December 2019 - February 2020",
    fileName: "data",
    text:
      "● Collaborated with lecturer to work on mining and analysing over 10,000 patents and providing a brief, concise and easy-to-understand result to be interpret and made use of.\n● Use of Python packages such as nltk, sklearn and matplotlib to manipulate data and present data elegantly"
  }
];

function CompanyTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.CompanyTitle}>
      <p>{props.companyName}</p>
      <p>{props.workDuration}</p>
    </div>
  );
}

function CompanyDetails(props) {
  const classes = useStyles();
  if (props.jobNumber === 0 || props.jobNumber % 2 === 0) {
    // image on the right
    return (
      <div className={classes.image}>
        <div className={classes.companyInfo}>
          <CompanyTitle
            companyName={companyDeets[props.jobNumber].companyName}
            workDuration={companyDeets[props.jobNumber].workDuration}
          />
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "3em" }}>
            {companyDeets[props.jobNumber].text}
          </p>
        </div>

        <img
          alt="Images of past projects"
          src={require(`./imgz/${companyDeets[props.jobNumber].fileName}.jpg`)}
        />
      </div>
    );
  } // image on the right
  else
    return (
      <div className={classes.image}>
        <img
          alt="Images of past projects"
          src={require(`./imgz/${companyDeets[props.jobNumber].fileName}.jpg`)}
        />
        <div className={classes.companyInfo}>
          <CompanyTitle
            companyName={companyDeets[props.jobNumber].companyName}
            workDuration={companyDeets[props.jobNumber].workDuration}
          />
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "3em" }}>
            {companyDeets[props.jobNumber].text}
          </p>
        </div>
      </div>
    );
}

export function About() {
  return (
    <div className="paras">
      <CompanyDetails jobNumber={0} />
      <CompanyDetails jobNumber={1} />
    </div>
  );
}
