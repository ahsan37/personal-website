import React from 'react';
import { Link } from 'react-router-dom';
import './WritingPage.css';

const MuslimTech = () => {
  return (
    <div className="writing-page">
      <div className="writing-container">
        <header className="writing-header">
          <h1>Muslim Tech: Bridging Faith and Innovation</h1>
          <div className="writing-meta">
            <span className="writing-date">2024</span>
          </div>
        </header>
        
        <article className="writing-content">
          
          
          <h2>Projects and Impact</h2>
          <p>
            Discuss specific projects like Muslim AI and Muslim Ratio and their impact...
          </p>
          
          <h2>Looking Forward</h2>
          <p>
            Share your vision for the future of Muslim tech...
          </p>
        </article>
        
        <footer className="writing-footer">
          <Link to="/" className="back-link">← Back to Home</Link>
        </footer>
      </div>
    </div>
  );
};

export default MuslimTech;
