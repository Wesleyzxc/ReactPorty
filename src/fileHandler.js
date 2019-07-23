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

            let orderedNotes = [];
            // first note

            timing.map((oneTime, index) => {
                if (index === 0) { orderedNotes.push(notes[0])}

                else if (oneTime === timing[index-1])
                    {
                        orderedNotes.push(notes[index]);
                    }
                    else
                    {
                        orderedNotes.push("\n" + notes[index]);
                    }
                }
            )


            // information of all notes in midi
            let noteStr = orderedNotes.join();

            // noteStr is replaced by all keys
            NOTE_TO_KEY.map(notePair => {
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
            <textarea disabled id="textarea" value={midiInfo}></textarea>

        </form>



    </div>;
}
