import React from 'react';
import './projects.css'; 

const projects = () => {
  const proj = [
    {
      title: "SMS->GCAL",
      role: "Text message to GCAL bot",
      duration: "Python",
      url: "https://github.com/ahsan37/SMS_to_GCAL"
    },
    {
      title: "Cashew",
      role: "Automatic expense tracking iOS app with Plaid",
      duration: "React Native, Node.js",
      url: "https://cashewtrack.com"
    },
    {
      title: "ExaGene",
      role: "Genomic analysis tool for 23andMe data",
      duration: "TypeScript, Node.js",
      url: "https://github.com/ahsan37/Gene-Analyzer"
    },
    {
      title: "Twitter Hackathon Proj.",
      role: "AI Feed Filtering tool - 3rd Place Winners",
      duration: "React, Rust, Python",
      url: "https://github.com/santiagomed/x-customized-feed"
    },
    {
      title: "Muslim AI",
      role: "AI Q&A bot for the Quran - 6k+ queries answered",
      duration: "TypeScript, Next.js",
      url: "https://www.muslimai.io"  
    },
    {
      title: "Voice Agent Testing Simulation",
      role: "Bullish on Voice",
      duration: "Python",
      url: "https://github.com/ahsan37/voice-agent"
    },
    {
      title: "Muslim Ratio",
      role: "Halal Haram Ratio Calculator - 200k+ users",
      duration: "HTML, CSS, JavaScript",
      url: "http://muslimratio.com"
    },
    {
      title: "MetaMusic",
      role: "Decentralized App to send music on Ethereum blockchain",
      duration: "Solidity, JavaScript",
      url: "https://waveportal-starter-project.ahsanwaseem.repl.co/"
    },
    {
      title: "Personal Discord Bot",
      role: "Personalized AI Chatbot to communicate to my alter-ego",
      duration: "Python"
    },
    {
      title: "Generative Art",
      role: "Art using Math",
      duration: "C++",
    },
  ];

  return (
    <div className="project-section">
        <h4 className='proj-title'>Software Projects</h4>
      {proj.map((prj, index) => (
        <div key={index} className="project-card">
          <div>
            <div className="project-title">
              <a href={prj.url} target="_blank" rel="noopener noreferrer">
                {prj.title}
              </a>
            </div>
            <div className="project-role">{prj.role}</div>
          </div>
          <div className="project-duration">{prj.duration}</div>
        </div>
      ))}
    </div>
  );
}

export default projects;
