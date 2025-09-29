import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import FinetuningLLM from './pages/FinetuningLLM';
import MentalModels2024 from './pages/MentalModels2024';
import MuslimTech from './pages/MuslimTech';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header className="App-header">
          <h1><Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>Ahsan Waseem</Link></h1>
          <nav>
            <a href="https://github.com/ahsan37">GitHub</a>
            <a href="https://www.linkedin.com/in/ahsan-waseem/">LinkedIn</a>
            <a href="mailto:ahsanwaseem1120@gmail.com">Contact</a>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writings/finetuning-llm" element={<FinetuningLLM />} />
          <Route path="/writings/mental-models-2024" element={<MentalModels2024 />} />
          <Route path="/writings/muslim-tech" element={<MuslimTech />} />
        </Routes>

        <footer>
          {/* Add footer if necessary */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
