import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';


export default function Header() {

 
  return (
    <div className="Header">
      <nav>
        <Link to="/">
          <button className="navText1">
            Home
          </button>
        </Link>
        <Link to="/About">
          <button className="navText2">
            About
          </button>
        </Link>
        <Link to='/feedback'>
          <button className="navText3">
            Feedback
          </button>
        </Link>
        <li className="navText4">
          <div className="logo">T</div>
        </li>
      </nav>
    </div>
  );
}
