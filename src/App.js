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
        <h5>Hey <span class="wave">👋</span></h5>
        <p>Thanks for visiting my website!</p>
        <p>I'm a Product Manager that loves to code; currently working at Microsoft!</p>
        <p>I graduated from Texas A&M University in May of 2023 where I received a Bachelor of Science in Multidiscipliary Engineering with a concentration in Computer Science and Business.</p>
        <p>
        I started to code after reading the Almanack of Naval Ravikant and learning about permissionless leverage. A month after reading that book I created a website that reached 150k+ users in 70+ countries. Now, I seek that leverage he talks about.
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
