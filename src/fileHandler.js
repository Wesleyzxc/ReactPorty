import React, { useState, useEffect } from 'react';
import Midi from '@tonejs/midi';

function getNotes(data) {
    let notes = [];
    data.forEach((note) => notes.push(note.name));
    return notes;
}

export function FileHandler() {
    const fileInput = React.createRef();
    const [midi, setMidi] = useState();

    useEffect(() => {
        console.log(midi);
        if (midi) {
            let notes = getNotes(midi.tracks[0].notes);
            document.getElementById('textarea').value =
                midi.name + '\n' + notes;
        }
    }, [midi]);

    const handleSubmit = async function(event) {
        event.preventDefault();
        let file = fileInput.current.files[0];

        // if file selected
        if (file) {
            if (file.name.endsWith('.mid')) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function() {
                    let arrayBuffer = this.result,
                        array = new Uint8Array(arrayBuffer);
                    setMidi(new Midi(array));
                };
            } else {
                alert('Select a correct midi file!');
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="audio/midi" ref={fileInput} />
                <button id="submitFile" type="submit">
                    Save
                </button>
                <br />
                <textarea id="textarea" />
            </form>
        </div>
    );
}
