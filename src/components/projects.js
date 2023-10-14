import React from 'react';
import './projects.css'; 

const projects = () => {
  const proj = [
    {
        title: "Muslim AI",
        role: "AI Q&A Bot for the Quran",
        duration: "React, Next.js, TypeScript",
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
        title: "Expense Tracker",
        role: "Finance Calculator with advanced categorization",
        duration: "React, Node.js",
        url: "https://expense-tracker-one-umber.vercel.app/"
      },
      {
        title: "GPT-3 Song Generator",
        role: "First AI Project - gpt wrapper (classic)",
        duration: "React, JavaScript",
        url: "https://gpt3-song-generator.vercel.app/"
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
            {/* Job Title as Link */}
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
