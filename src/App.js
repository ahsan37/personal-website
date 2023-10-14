import React from 'react';
import Projects from './components/projects';
import Location from './components/location';
import MISC from './components/misc';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ahsan Waseem</h1>
        <nav>
          <a href="https://github.com/ahsan37">GitHub</a>
          <a href="https://www.linkedin.com/in/ahsan-waseem/">LinkedIn</a>
          <a href="mailto:wahsan77@yahoo.com">Contact</a>
        </nav>
      </header>

      <section className="App-intro">
        <p>I'm him.</p>
        <p>Socially ^</p>
        <p>Professionally, I am a Product Manager at Microsoft.</p>
        <p>I graduated from Texas A&M University, <i>ivy of the south they say</i>, in May of 2023 with a Bachelor of Science in Multidiscipliary Engineering with a concentration in Computer Science and Business.</p>
        <p>
          I started to code after reading the Almanack of Naval Ravikant and learning about permissionless leverage. A month after reading that book I created a website that reached 150k+ users in 70+ countries. Now, I seek that leverage he talks about.
        </p>
        <p>
         When I'm exhausted being him, I'm just Ahsan, a silly goofy little (6 foot 2) dude!
        </p>
      </section>

      <Location />
      <Projects />
      <MISC />


      <footer>
        {/* Add footer if necessary */}
      </footer>
    </div>
  );
}

export default App;
