import React, { useState, useEffect } from "react";
import "../styles/textTester.css";
import { createWorker } from "tesseract.js";
import { Link } from "react-router-dom";


export default function TextTester() {
  let [text, setText] = useState("");

  function upperCase() {
    let newText = text.toUpperCase();
    setText(newText);
    if (text === "") {
      alert("Enter text Please");
    }
  }
  const ChangedValue = (event) => {
    console.log("change");
    setText(event.target.value);
  };

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
  const mobileFonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Comic Sans MS",
    "Lucida Grande",
    "Lucida Sans Unicode",
    "Arial Black",
    "Gadget",
    "Geneva",
    "Optima",
    "Palatino",
    "Courier",
    "Book Antiqua",
    "Century Gothic"
]


  function ExtraSpaceRemover() {
    setText(text.trim().replace(/\s+/g, " "));
  }

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if(window.innerWidth <= 700){
      setOptions(mobileFonts)
    }
    else{
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

  function ImagetoText(event) {
    let file = event.target.files[0];

    async function data() {
      try {
        const worker = await createWorker("eng");
        const ret = await worker.recognize(file);
        console.log(ret.data.text);
        setText(ret.data.text);
        await worker.terminate();
      } catch (err) {
        console.log(err);
      }
    }
    console.log(data());
  }



  return (
    <>
      <div className="container">
        <div className="main">
        
          <textarea
            type="text"
            name="Text"
            id="inputText"
            value={text}
            onChange={ChangedValue}
            rows="10"
            cols="50"
            style={fontStyles}
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

          <div className="image">
            import Image
            <input
              type="file"
              name="import Image"
              id="imageFile"
              accept="image/*"
              onChange={ImagetoText}
            />
          </div>

          <div className="Translate-container">
            <Link to="/Speechmode"><button className="Transletor">Speech Mode</button></Link> 
          </div>

          <div className="voice-container">
             <Link to="/Voicemode"><button className="voicemode">Voice mode</button></Link> 
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
  );
}
