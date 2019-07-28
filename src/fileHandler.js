import React, { useState, useEffect } from 'react';
import Midi from '@tonejs/midi';
import TextareaAutosize from 'react-textarea-autosize';

import './index.css';
import { NOTE_TO_KEY } from './keybindings';

function getNotes(midi, track) {
    let notes = midi.tracks[track].notes.map(note => {
        return { note: note.name, time: note.time };
    });
    console.log(notes);
    return notes;
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function organiseNotes(midi, orderedNotes) {
    // right hand
    let notes = getNotes(midi, 0);

    notes.forEach((oneTime, index) => {
        if (index === 0) { orderedNotes.push(notes[0].note) }

        else if (oneTime.time === notes[index - 1].time) { // current time is same as previous
            orderedNotes.push(notes[index].note);
        }
        else { // current time is not the same as the previous
            orderedNotes.push("\n" + notes[index].note);
        }
    });
}


export function FileHandler() {
    const fileInput = React.createRef();

    // JSON of midi
    const [midi, setMidi] = useState();
    const [midiInfo, setMidiInfo] = useState("");

    let orderedNotes = [];
    let orderedNotes2 = [];

    useEffect(() => {
        if (midi) {
            // group same timing
            organiseNotes(midi, orderedNotes);


            // information of all notes in midi in string format
            let noteStr = orderedNotes.join();

            // noteStr is replaced by all keys
            NOTE_TO_KEY.forEach(notePair => {
                noteStr = replaceAll(noteStr, notePair[0], notePair[1]);
            })

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
            <input id="midiload" type="file" accept="audio/midi" ref={fileInput}></input>
            <button id="submitFile" type="submit">Convert</button>
        </form>
        <div id="textarea">
            <DisplayArea midiInfo={midiInfo} orderedNotes={orderedNotes} />


        </div>

    </div>;
}

function DisplayArea(props) {

    return (

        <TextareaAutosize disabled
            useCacheForDOMMeasurements
            value={props.midiInfo}
            onChange={e => this.setState({ value: e.target.value })}
        />



    )
}


