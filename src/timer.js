import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Slider, FormHelperText } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import BEEP from "./assets/beep.mp3";

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

  const [fraction, setFraction] = useState(1);
  function calculateTimeFraction() {
    if (startTimer === "rest") setFraction(displayTime / next);
    else setFraction(displayTime / value);
    return fraction;
  }
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = calculateTimeFraction() * 283 + " 283";
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  useEffect(() => {
    setCircleDasharray();
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>Timer 1</div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="start slider"
        value={value}
        onChange={handleStart}
      />
      <div>Timer 2</div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="rest slider"
        value={next}
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
      </Button>{" "}
      <Button // stop button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => setStart("stop")}
      >
        Stop
      </Button>
      <TimeValue time={displayTime} />
    </div>
  );
}

function TimeValue(props) {
  let audio = new Audio(BEEP);
  function formatTimeLeft(time) {
    // number of minutes
    const minutes = Math.floor(time / 60);
    // number of seconds minus minutes
    let seconds = time % 60;
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
      if (seconds < 3) {
        audio.addEventListener("canplaythrough", (event) => {
          /* the audio is now playable; play it if permissions allow */
          audio.play();
        });
      }
    }
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  //TODO add styling
  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle
            className="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            strokeDasharray="283 283"
            className="base-timer__path-remaining ${remainingPathColor}"
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {formatTimeLeft(props.time)}
      </span>
    </div>
  );
}
