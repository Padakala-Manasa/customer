// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Badges from './components/Badges';
import FeedbackForm from './components/FeedbackForm';
import Quiz from './components/Quiz';
import Suggestions from './components/Suggestions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Telecom Gamification Platform</h1>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/quiz" className="nav-link">Quiz</Link>
            <Link to="/badges" className="nav-link">Badges</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
            <Link to="/suggestions" className="nav-link">Suggestions</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to the Telecom Gamification Platform</h2>
      <p>Choose an option from the navigation menu to get started.</p>
    </div>
  );
}

export default App;