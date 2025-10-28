import React from 'react';
import Projects from './projects';
import Writings from './writings';
import Location from './location';
import MISC from './misc';

const Home = () => {
  return (
    <>
      <section className="App-intro">
        <h5>Howdy <span className="wave">👋</span></h5>
        <p>Thanks for visiting my website!</p>
        <p>I graduated from Texas A&M University in 2023 with a concentration in Computer Science and I currently work at Microsoft!</p>
        <p>
        Pre-college, I explored various mediums of creation like music production, podcasts, and video editing. After reading the Almanack of Naval Ravikant and learning about his philosophy of permissionless leverage, I was inspired to code. A month after reading that book, I created a website that reached over 200k users; now I seek the leverage he talks about.
        </p>
      </section>

      <Location />
      <Projects />
      <Writings />
      <MISC />
    </>
  );
};

export default Home;
