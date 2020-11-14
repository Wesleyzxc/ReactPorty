import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "./index.css";

export function Recording() {
  const [selectedInput, setSelected] = useState();
  const [inputDevices, setInput] = useState([]);
  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: "",
  });

  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: "",
  });

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setInput(devices.filter((device) => device.kind === "audioinput"));
      setSelected(devices.find((device) => device.kind === "audioinput").deviceId);
    });
  }, []);

  const chunks = useRef([]);

  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstart = function () {
          setRecording({
            active: true,
            available: false,
            url: "",
          });
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.current.push(e.data);
        };

        mediaRecorder.onstop = function () {
          const blob = new Blob(chunks.current, {
            type: "audio/wav",
          });
          chunks.current = [];
          const url = URL.createObjectURL(blob);
          setRecording({
            active: false,
            available: true,
            url,
          });
        };

        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder,
        });
      })
      .catch((error) => {
        console.log(error);
        setStream({ ...stream, error });
      });
  }

  return (
    <div className="">
      <Select
        defaultValue="default"
        onChange={(e) => {
          setSelected(e.target.value);
        }}>
        {inputDevices.map((eachInput, inputIndex) => (
          <MenuItem key={inputIndex} value={eachInput.deviceId}>
            {eachInput.label}
          </MenuItem>
        ))}
      </Select>
      {stream.access ? (
        <div className="audio-container">
          <Button
            disabled={recording.active}
            className={recording.active ? "active" : null}
            onClick={() => !recording.active && stream.recorder.start()}>
            Start Recording
          </Button>
          <Button disabled={!recording.active} onClick={() => stream.recorder.stop()}>
            Stop Recording
          </Button>
          {recording.available && <audio controls src={recording.url} />}
        </div>
      ) : (
        <Button onClick={getAccess}>Get Mic Access</Button>
      )}
    </div>
  );
}
