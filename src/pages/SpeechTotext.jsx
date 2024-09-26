import React,{ useState, useEffect } from 'react'
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition'
import "../styles/textTester.css";
import { Link } from 'react-router-dom';
export default function SpeechToText() {

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  let [text, setText] = useState("");

  

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);


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



  const fontsLibrary = [
    "Courier New",
    "Courier",
    "monospace",
    "Franklin Gothic Medium",
    "Arial Narrow",
    "Gill Sans",
    "Gill Sans MT",
    "Calibri",
    "Lucida Sans",
    "Lucida Sans Regular",
    "Segoe UI",
    "Tahoma",
    " Geneva",
    "Verdana",
    "sans-serif",
    "Times New Roman",
    "Times",
    "serif",
    "Trebuchet MS",
    "Lucida Sans Unicode",
    "Lucida",
    "Arial",
    "Helvetica",
    "sans-serif",
    "Cambria",
    "Cochin",
    "Georgia, Times",
    "Times New Roman",
    "Impact",
    "Haettenschweiler",
    "Arial Narrow Bold",
    "Verdana",
    "Geneva",
    "Tahoma",
    "sans-serif",
  ];

  function ExtraSpaceRemover() {
    setText(text.trim().replace(/\s+/g, " "));
  }

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if(fontsLibrary)
    {
    setOptions(fontsLibrary);
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fontStyles = {
    fontFamily: selectedOption,
  };

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

  

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

 
  function onRecording(){
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    alert("Recording started")
   
  }
  function offRecording(){
    SpeechRecognition.stopListening();
    alert("Recording stoped")
   
  }
 
  
  return (
    <>
    <div className="container">
      <div className="main">
      <textarea
          id='inputText'
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"
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

          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="FontSelection"
          >
            <option value="">Select Font</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button className="Button" onClick={CopyText}>
            Copy
          </button>
          <button className="Button" onClick={clearText}>
            Clear
          </button>
        </div>

        <div className="voicemode-container">
          <div className="Home">
            <Link to="/"><button className='normalbtn'>Normal Mode</button></Link>
          </div>
          <div className="Btn">
            <button className="btn1" onClick={onRecording}>
                Start Recording
            </button>

            <button className="btn2" onClick={offRecording}>
                Stop Recording
            </button>
          </div>
        </div>

        <div className="footer">
          <div className="preview">
            <p className="PreviewHeading">Preview</p>
            <textarea
              value={text}
              rows="10"
              cols="80"
              className="preview-text"
              style={fontStyles}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
