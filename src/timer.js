import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Slider } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
  root: {
    color: "primary",
    height: 8,
    width: "10%",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export function Timer() {
  const [value, setValue] = useState(30);
  const [next, setNext] = useState(10);
  const [displayTime, setDisplay] = useState(30);
  // on start slider movements
  const handleStart = (event, newValue) => {
    if (startTimer === "stop" || startTimer === "rest") {
      setValue(newValue);
      setDisplay(newValue);
    }
  };
  // on rest slider movements
  const handleRest = (event, newValue) => {
    if (startTimer === "stop" || startTimer === "start") setNext(newValue);
  };

  const [startTimer, setStart] = useState("stop"); // stop is nothing, start is exercise time and rest is rest time

  useEffect(() => {
    if (startTimer === "start") {
      // set to exercise time
      setTimeout(() => {
        // reduce timer
        if (displayTime > 0) {
          setDisplay(displayTime - 1);
        }
        // set rest timer
        else {
          setDisplay(next);
          setStart("rest");
        }
      }, 1000);
    } else if (startTimer === "rest") {
      setTimeout(() => {
        // reduce timer
        if (displayTime > 0) {
          setDisplay(displayTime - 1);
        }
        // set rest timer
        else {
          setDisplay(value);
          setStart("start");
        }
      }, 1000);
    }
  });

  return (
    <div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="start slider"
        defaultValue={value}
        onChange={handleStart}
      />
      <div />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="rest slider"
        defaultValue={next}
        onChange={handleRest}
      />
      <div />
      <Button // start button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => setStart("start")}
      >
        Start
      </Button>

      {displayTime}
      {/* display time here */}

      <Button // stop button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => setStart("stop")}
      >
        Stop
      </Button>
    </div>
  );
}
