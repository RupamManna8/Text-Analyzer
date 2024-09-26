import React from 'react';
import '../styles/About.css'; // Import your CSS file

const About = () => {
  return (
  
    <div className="about-section">
      <h2>About Our Text Tool</h2>
      <p>
        Welcome to our text manipulation tool! Our application provides various features to help you manipulate and analyze text easily.
      </p>
      <h3>Features:</h3>
      <ul>
        <li>Convert text to upper case and lower case</li>
        <li>Remove extra spaces from text</li>
        <li>Copy text to clipboard</li>
        <li>Change text font</li>
        <li>Extract text from images using OCR (Optical Character Recognition)</li>
        <li>Switch to speech mode to listen to text</li>
        <li>Switch to voice mode to input text using voice commands</li>
      </ul>
      <h3>How to Use:</h3>
      <p>
        Simply enter your text in the provided textarea, and use the buttons and options to manipulate the text as desired. You can also import images containing text to extract the text from them.
      </p>
      <p>
        Our application is designed to be user-friendly and accessible, catering to various text manipulation needs.
      </p>
      <p>
        Thank you for using our text tool! If you have any feedback or suggestions, feel free to reach out to us.
      </p>
    </div>
 
  );
};

export default About;
