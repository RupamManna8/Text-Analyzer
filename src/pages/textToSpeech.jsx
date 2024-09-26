import React, { useState, useEffect } from "react";
import "../styles/textTester.css";

export default function TextToSpeech() {
  let [text, setText] = useState("");
  const [voice, setVoice] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  function upperCase() {
    let newText = text.toUpperCase();
    setText(newText);
    if (text === "") {
      alert("Enter text Please");
    }
  }

  function lowerCase() {
    let newText = text.toLowerCase();
    setText(newText);
    if (text === "") {
      alert("Enter text Please");
    }
  }

  let Lines = text
    .split(/\r?\n|\r/)
    .filter((Lines) => Lines.trim() !== "").length; //using filter and trim to remove  spaces

  let Word = text.split(" ").filter((word) => word.trim() !== "").length; //+ text.split(/\r?\n|\r/).length; //using filter and trim to remove  spaces .filter(word => word.trim() !== '')

  let characters =
    text.length -
    text.split(" ").filter((word) => word.trim() !== " ").length +
    1;

  let actualWord;

  if (Lines) {
    actualWord = Word + Lines - 1;
  } else {
    actualWord = Word;
  }

  function ExtraSpaceRemover() {
    setText(text.trim().replace(/\s+/g, " "));
  }

  function CopyText() {
    if (text === "") {
      alert("Please Enter a text");
    } else {
      navigator.clipboard.writeText(text);
      alert("Text Copied To clipboard");
    }
  }

  function clearText() {
    if (text === "") {
      alert("Please Enter a text");
    } else {
      setText("");
    }
  }

  const handleText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      synth.speak(utterance);
    }

    setIsPaused(false);
    
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="speek-container">
            <div className="SpeekButtons">
              <button onClick={handlePlay} className="voicechecker">
                {isPaused ? "Resume" : "Play"}
              </button>
              <button onClick={handlePause} className="voicechecker">
                Pause
              </button>
              <button onClick={handleStop} className="voicechecker">
                Stop
              </button>
            </div>

            <select
              value={voice?.name}
              onChange={handleVoiceChange}
              className="voiceOptions"
            >
             
              {window.speechSynthesis.getVoices().map((voice) => (
                
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            id="inputText"
            rows="10"
            value={text}
            onChange={handleText}
            cols="50"
            placeholder="Enter text here"
          />
          <p className="counter">
            {actualWord} words {characters} characters
          </p>
          <div className="buttons">
            <button className="Button" onClick={upperCase}>
              Upper Case
            </button>
            <button className="Button" onClick={lowerCase}>
              Lower Case
            </button>
            <button className="Button" onClick={ExtraSpaceRemover}>
              Remove Extra Space
            </button>

            <button className="Button" onClick={CopyText}>
              Copy
            </button>
            <button className="Button" onClick={clearText}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
