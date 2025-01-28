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
          <a href="mailto:ahsanwaseem1120@gmail.com">Contact</a>
        </nav>
      </header>

      <section className="App-intro">
        <h5>Hey <span class="wave">👋</span></h5>
        <p>Thanks for visiting my website!</p>
        <p>I'm a Product Manager that loves to code; currently working at Microsoft!</p>
        <p>I graduated from Texas A&M University in 2023 with a concentration in Computer Science.</p>
        <p>
        Pre-college, I explored various mediums of creation like music production, podcasts, and video editing. After reading the Almanack of Naval Ravikant my freshamn year of college and learning about his philosophy of permissionless leverage, I learned to code. A month after reading that book, I created a website that reached over 200k users; now I seek the leverage he talks about.
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
