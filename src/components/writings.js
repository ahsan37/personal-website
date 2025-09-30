import React from 'react';
import { Link } from 'react-router-dom';
import './writings.css'; 

const writings = () => {
  const writingsList = [
    {
      title: "Finetuning an LLM on my text message data",
      date: "2025",
      route: "/writings/finetuning-llm"
    },
    {
      title: "2024 Mental Models",
      date: "2024",
      route: "/writings/mental-models-2024"
    }
  ];

  return (
    <div className="writings-section">
      <h4 className='writings-title'>Writings</h4>
      {writingsList.map((writing, index) => (
        <div key={index} className="writing-card">
          <div>
            <div className="writing-title">
              <Link to={writing.route}>
                {writing.title}
              </Link>
            </div>
          </div>
          <div className="writing-date">{writing.date}</div>
        </div>
      ))}
    </div>
  );
}

export default writings;
