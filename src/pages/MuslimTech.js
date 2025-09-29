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
          <p>
            Your writing content goes here. Explore how Islamic values can guide ethical technology development.
          </p>
          
          <h2>The Intersection of Faith and Technology</h2>
          <p>
            Discuss how Islamic principles can inform technology decisions...
          </p>
          
          <h2>Building for the Ummah</h2>
          <p>
            Share your thoughts on creating technology that serves the Muslim community...
          </p>
          
          <h2>Ethical Considerations</h2>
          <p>
            Explore the ethical frameworks that guide your work...
          </p>
          
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
