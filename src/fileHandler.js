import React, { useState, useEffect } from 'react';
import Midi from '@tonejs/midi';
import './index.css';
import { NOTE_TO_KEY } from './keybindings';

function getNotes(data) {
    let notes = [];
    data.forEach((note) => notes.push(note.name));
    return notes;
}

function getTime(data) {
    let times = [];
    data.forEach((timing) => times.push(timing.time));
    return times;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function FileHandler() {
    const fileInput = React.createRef();

    // JSON of midi
    const [midi, setMidi] = useState();
    const [midiInfo, setMidiInfo] = useState("");

    useEffect(() => {
        if (midi) {
            console.log(midi)
            let notes = getNotes(midi.tracks[0].notes);
            let timing = getTime(midi.tracks[0].notes);

            let notesAndTime = notes.map((e, i) => timing[i] + " " + e);
            // information of all notes in midi
            let noteStr = notesAndTime.join();

            // noteStr is replaced by all keys
            NOTE_TO_KEY.map(notePair => {
                noteStr = replaceAll(noteStr, notePair[0], notePair[1]);
            })
            console.log(notesAndTime);

            setMidiInfo(midi.name + "\n" + noteStr);
        }
    }, [midi])

    const handleSubmit = async function (event) {
        event.preventDefault();
        let file = fileInput.current.files[0];

        // if file selected
        if (file) {
            if (file.name.endsWith('.mid')) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function () {
                    let arrayBuffer = this.result, array = new Uint8Array(arrayBuffer);
                    setMidi(new Midi(array));
                };


            }
            else {
                alert("Select a correct midi file!");
            }
        }

    };
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="file" accept="audio/midi" ref={fileInput}></input>
            <button id="submitFile" type="submit">Save</button>
            <br></br>
            <textarea id="textarea" value={midiInfo}>

            </textarea>

        </form>



    </div>;
}
