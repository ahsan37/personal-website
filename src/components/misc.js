import React from 'react';
import './projects.css'; 

const MISC = () => {
  const miscy = [
    {
        title: "DIY Distributed Modal Speakers",
        role: "First hardware project + Blog",
        duration: "2022",
        url: "https://medium.com/@ahsan-waseem/building-the-worlds-best-speakers-at-home-14435b7a150"  
      },
      {
        title: "Diegetic Sounds Music Video",
        role: "Funky Video Project for fun",
        duration: "2021",
        url: "https://youtu.be/WhJFQaDtygw"
      },
      {
        title: "Let Me Learn Podcast",
        role: "Everyone has to try once",
        duration: "2020",
        url: "https://open.spotify.com/show/3t5tx2XEl0ZG09p0ymolqS"
      },


  ];

  return (
    <div className="project-section">
        <h4 className='proj-title'>Miscellaneous Projects</h4>
      {miscy.map((mis, index) => (
        <div key={index} className="project-card">
          <div>
            <div className="project-title">
              <a href={mis.url} target="_blank" rel="noopener noreferrer">
                {mis.title}
              </a>
            </div>
            <div className="project-role">{mis.role}</div>
          </div>
          <div className="project-duration">{mis.duration}</div>
        </div>
      ))}
    </div>
  );
}

export default MISC;
