import React, { useState, useEffect } from 'react';
import Midi from '@tonejs/midi';
import TextareaAutosize from 'react-textarea-autosize';
import happySong from './songs/happy_and_you_know_it.mid';
import './index.css';
import { NOTE_TO_KEY } from './keybindings';

function getNotes(midi, track) {
    let notes = midi.tracks[track].notes.map(note => {
        return { note: note.name, time: note.time };
    });
    return notes;
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

// Adds newline to array based on timing
function organiseNotes(notes, modifiedArray) {

    notes.forEach((oneTime, index) => {
        if (index === 0) { modifiedArray.push(notes[0].note) }

        else if (oneTime.time === notes[index - 1].time) { // current time is same as previous
            modifiedArray.push(notes[index].note);
        }
        else { // current time is not the same as the previous
            modifiedArray.push("\n" + notes[index].note);
        }
    });
}

function checkDefaultSong(selectSong) {
    if (selectSong === 0) {
        return 0;
    }
    else if (selectSong === 1) {
        return 1;
    }

    else if (selectSong === 2) {
        return 2;
    }

    else if (selectSong === 3) {
        return 3;
    }
}

export function FileHandler() {
    const fileInput = React.createRef();

    // JSON of midi
    const [midi, setMidi] = useState();
    const [midiInfo, setMidiInfo] = useState("");
    const [song, setSong] = useState(0);

    let orderedNotes = [];

    useEffect(() => {
        if (midi) {
            let notes = getNotes(midi, 0);
            let notes2 = [];

            if (midi.tracks.length === 2) {
                notes2 = getNotes(midi, 1);
            }

            let combinedHands = notes.concat(notes2);
            combinedHands.sort(GetSortOrder("time"));
            organiseNotes(combinedHands, orderedNotes);

            // information of all notes in midi in string format
            let noteStr = orderedNotes.join();

            // noteStr is replaced by all keys
            NOTE_TO_KEY.forEach(notePair => {
                noteStr = replaceAll(noteStr, notePair[0], notePair[1]);
            })
            console.log(orderedNotes);
            setMidiInfo(midi.name + "\n" + noteStr);
        }
    }, [midi])

    const handleSubmit = async function (event) {
        event.preventDefault();
        let file = fileInput.current.files[0];
        checkDefaultSong(song);
        // if (song !== 0) {
        //     file = { happySong };
        //     console.log(file);
        //     //TODO Convert happySong Object to Blob
        //     const bytes = new TextEncoder().encode(file);
        //     const blob = new Blob([bytes], {
        //         type: "application/json;charset=utf-8"
        //     });
        //     file = blob;
        //     console.log(file);

        // }

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
            <div className="groups">
                <select id="defaultsong" onChange={() => {
                    let e = document.getElementById('defaultsong');
                    setSong(parseInt(e.options[e.selectedIndex].value, 10));
                }}>
                    <option value="0" selected>Choose one of the default songs to try! </option>
                    <option value="1">Twinkle Twinkle Little Star</option>
                    <option value="2">Happy and You Know it</option>
                    <option value="3">Mary had a Little Lamb</option>
                </select>
                <button id="submitFile" type="submit">Convert</button>
            </div>
        </form>

        {/* <textarea id='textarea' value={midiInfo} disabled={true}></textarea> */}

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



function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}  