import React from 'react';
import { Link } from 'react-router-dom';
import './WritingPage.css';

const MentalModels2024 = () => {
  return (
    <div className="writing-page">
      <div className="writing-container">
      <nav className="writing-nav">
          <Link to="/" className="back-link">← Back to Home</Link>
        </nav>
        <header className="writing-header">
          <h1>2024 Mental Models</h1>
          <div className="writing-meta">
            <span className="writing-date">2024</span>
          </div>
        </header>
        
        <article className="writing-content">
          <p>
            A collection of mental models and observations from 2024.
          </p>
          
          <p>Avoiding technically difficult conversations with really smart people is a good defense mechanism to overcome. The rate of growth is only noticeable much further down the timeline.</p>
          
          <p>Inspiration is perishable, act on it fast. Telling people expedites inspiration's death.</p>
          
          <p>It takes n+1 hours to realize your capacity for work. n is much greater than you think.</p>
          
          <p>The youngest child is responsible for ending their parents' parenthood.</p>
          
          <p>Doers always beat thinkers, even if the thinkers are much smarter and the doers don't think.</p>
          
          <p>Passive and active time are both extremely valuable in creating friendship.</p>
          
          <p>Being alone physically has always been a superpower. Nowadays knowing how to be alone virtually and physically is a superpower.</p>
          
          <p>The value of consecutive time spent with anyone you enjoy is fairly logarithmic but drops fast after a certain hour/day.</p>
          
          <p>Sleep quality is the first most important metric for a great life.</p>
          
          <p>Being vulnerable increases your surface area for luck through networks.</p>
          
          <p>Identity lags reality by 1-2 years, find people whose reality matches your identity to accelerate growth.</p>
          
          <p>Reading the right things is more important than just reading. Reading the wrong things is detrimental and takes much time to correct. Reading the right things at depth is even more important.</p>
          
          <p>Gaps in understanding are only noticeable after believing you don't have an understanding.</p>
          
          <p>Believing your thoughts can be malleable is one of the hardest and most important skills to develop as you age.</p>
          
          <p>Capacity to have really close friends is finite, you need to sacrifice to create room for better ones.</p>
          
          <p>Your ability to do anything is almost linearly correlated with the belief that you'll figure it out.</p>
          
          <p>Being extremely nurturing and extremely driven is a rare but optimal combo to look for in people.</p>
          
          <p>Living alone strengthens decision making ability more than expected.</p>
          
          <p>Everyone is given a societal title that they can be easily identified with, contradicting the expectations of that title usually demonstrates high agency.</p>
          
          <p>Learning how to detect ad hominem attacks from yourself and others helps filter out bad thoughts and bad people.</p>
          
          <p>A surprisingly good and fun proxy to determine how well you know a topic is how many extremely niche jokes you understand in that space. (This is because jokes usually allude to something not explicitly stated and require deeper context.)</p>
          
          <p>In romantic relationships it's better to find someone who brings you immense peace rather than immense happiness or excitement.</p>
          
          <p>One of many good heuristics to measure when meeting people for the first time is to make fun of yourself, then make fun of them.</p>
        </article>
  
      </div>
    </div>
  );
};

export default MentalModels2024;
