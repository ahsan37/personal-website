import React from 'react';
import './projects.css'; 

const projects = () => {
  const proj = [
    {
      title: "Cashew",
      role: "Expense tracking web app",
      duration: "React, Node.js",
      url: "https://cashewtrack.com"
    },
    {
        title: "Muslim AI",
        role: "AI Q&A bot for the Quran",
        duration: "TypeScript, Next.js",
        url: "https://www.muslimai.io"  
      },
      {
        title: "MetaMusic",
        role: "Decentralized App to send music on Ethereum blockchain",
        duration: "Solidity, JavaScript",
        url: "https://waveportal-starter-project.ahsanwaseem.repl.co/"
      },
      {
        title: "Muslim Ratio",
        role: "Halal Haram Ratio Calculator",
        duration: "HTML, CSS, JavaScript",
        url: "http://muslimratio.com"
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
        <h4 className='proj-title'>Noteable Software Projects</h4>
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
