import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { KEY_RANGE } from './keybindings'
import SoundfontProvider from './SoundFontProvider.js';
import 'react-piano/dist/styles.css';
import './piano.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

export function LongPiano() {
    const noteRange = {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('b6'),
    };
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('b6');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KEY_RANGE,
    });
    return <div>
        <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
                <Piano className="piano"
                    noteRange={noteRange}
                    width={window.innerWidth - 300}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading}
                    keyboardShortcuts={keyboardShortcuts}
                />
            )}
        />
    </div>

}