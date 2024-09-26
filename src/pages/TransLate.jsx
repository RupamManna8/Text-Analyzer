import React, { useState } from 'react';
import '../styles/Translator.css'
import countries from '../CountryCodes.json'


const TranslateText = () => {
  const [language,setlanguage]=useState('en');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState(''); // Default target language

 function translateText()
  {
        fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${language}|${targetLanguage}`)
        .then((res)=> res.json())
        .then((data)=>{
          console.log(data)
         setTranslatedText(data.responseData.translatedText);
        })

  }
  let fromlanValue = ""
  let lanvalue=""
  let setlan=(e)=>{
   lanvalue = e.target.value;
   console.log(lanvalue.toLowerCase())
   setTargetLanguage(lanvalue.toLowerCase())
  }

  let setFormLan=(e)=>{
    fromlanValue = e.target.value;
    console.log(fromlanValue.toLowerCase())
    setlanguage(fromlanValue.toLowerCase())
   }
 

  
  return (
    <div className='container'>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={targetLanguage} onChange={setlan}>
        
      <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {`${country.name}`}
          </option>
        ))}
       
       
        {/* Add more language options as needed */}
      </select>

      <select value={language} onChange={setFormLan}>
        
        <option value="">Select</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {`${country.name}`}
            </option>
          ))}
         
         
          {/* Add more language options as needed */}
        </select>
      <button onClick={translateText}>Translate</button>
      {translatedText && (
        <div style={{color:"red"}}>
          <p>Translated Text:</p>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateText;
