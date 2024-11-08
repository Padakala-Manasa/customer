// Suggestions.js
import React, { useState } from 'react';
import './Suggestions.css';

function Suggestions() {
  const [suggestion, setSuggestion] = useState('');
  const [showBadge, setShowBadge] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowBadge(true);
    setSuggestion('');
  };

  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <h2>💡 Share Your Ideas!</h2>
        <p className="subtitle">Your suggestions help us improve our services</p>
      </div>

      <div className="suggestions-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="suggestion">What's on your mind?</label>
            <textarea
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Type your suggestion here..."
              required
              rows="4"
            />
          </div>
          <button type="submit" className="submit-button">
            <span>Submit Suggestion</span>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>

      {showBadge && (
        <div className="badge-popup">
          <div className="badge-content">
            <h3>Congratulations! 🎉</h3>
            <img 
              src={process.env.PUBLIC_URL + '/win.png'}
              alt="Winner Badge" 
              className="badge-image"
            />
            <p>You've earned a Suggestions Champion badge!</p>
            <button onClick={() => setShowBadge(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Suggestions;