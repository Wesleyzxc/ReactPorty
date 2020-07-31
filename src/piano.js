import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { KEY_RANGE } from "./keybindings";
import SoundfontProvider from "./SoundFontProvider";
import "react-piano/dist/styles.css";
import "./index.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

export function LongPiano() {
  const noteRange = {
    first: MidiNumbers.fromNote("c2"),
    last: MidiNumbers.fromNote("c5"),
  };
  const firstNote = noteRange.first;
  const lastNote = noteRange.last;
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KEY_RANGE,
  });

  // More precise key press but not available
  // document.addEventListener('DOMContentLoaded', () => {
  //     document.addEventListener('keydown', event => {
  //         const key = event.code;
  //         console.log(key);
  //     });
  // });
  return (
    <div>
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }) => (
          <Piano
            className="piano"
            noteRange={noteRange}
            width={window.innerWidth - 200}
            keyWidthToHeight={0.3}
            playNote={playNote}
            stopNote={stopNote}
            disabled={isLoading}
            keyboardShortcuts={keyboardShortcuts}
          />
        )}
      />
    </div>
  );
}
