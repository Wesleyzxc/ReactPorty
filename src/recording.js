import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "./index.css";

export function Recording() {
  const [selectedInput, setSelected] = useState();
  const [selectedVideo, setVideoSelected] = useState();
  const [inputDevices, setInput] = useState([]);
  const [videoInputs, setVideos] = useState([]);

  const [videoStream, setVideoStream] = useState();
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
      setVideos(devices.filter((device) => device.kind === "videoinput"));
      setInput(devices.filter((device) => device.kind === "audioinput"));
      setSelected(devices.find((device) => device.kind === "audioinput").deviceId);
      setVideoSelected(devices.find((device) => device.kind === "videoinput").deviceId);
    });
  }, []);

  useEffect(() => {
    openCamera(selectedVideo, 1280, 720).then((vidStream) => setVideoStream(vidStream));
  }, [selectedVideo]);

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

  // For WebRTC

  async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }

  // Open camera with at least minWidth and minHeight capabilities
  async function openCamera(cameraId, audioId) {
    const constraints = {
      audio: {
        deviceId: audioId,
      },
      video: {
        deviceId: cameraId,
      },
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
  }

  async function playVideoFromCamera() {
    try {
      const constraints = {
        video: {
          deviceId: selectedVideo,
        },
      };
      openCamera(selectedVideo).then((stream) => {
        const vidStream = stream;
        const videoElement = document.getElementById("localVideo");
        videoElement.srcObject = stream;
        videoElement.play();
      });
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }

  return (
    <div className="recording">
      <div className="mic" style={{ textAlign: "center", padding: "10px" }}>
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
      <div className="webrtc" style={{ textAlign: "center" }}>
        This section is for trying webrtc
        <Button onClick={playVideoFromCamera}>Get Camera</Button>
        <Select
          onChange={(e) => {
            setVideoSelected(e.target.value);
          }}>
          {videoInputs.map((eachInput, inputIndex) => (
            <MenuItem key={inputIndex} value={eachInput.deviceId}>
              {eachInput.label}
            </MenuItem>
          ))}
        </Select>
        <br />
        <video id="localVideo" autoplay />
      </div>
    </div>
  );
}
