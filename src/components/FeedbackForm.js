import React, { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Simulating a feedback submission
    fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }), // Only sending feedback
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFeedback('');
        setShowBadge(true); // Show badge on successful submission
        setSuccessMessage('Feedback submitted successfully!'); // Set success message

        // Optional: Hide the badge after a few seconds
        setTimeout(() => {
          setShowBadge(false);
        }, 5000); // Hide after 5 seconds
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        setErrorMessage('Error submitting feedback. Please try again.');
      });
  };

  const handleCloseBadge = () => {
    setShowBadge(false);
  };

  const isSubmitDisabled = !feedback; // Disable submit button if feedback is empty

  return (
    <div className="feedback-form">
      <div className="feedback-header">
        <h2>📝 Submit Your Feedback</h2>
        <p className="subtitle">Your feedback helps us enhance our services</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback here..."
            required
            rows="4"
          />
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitDisabled}>
          <span>Submit Feedback</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      {showBadge && (
        <div className="badge-popup">
          <div className="badge-content">
            <h3>Congratulations! 🎉</h3>
            <img 
              src='C:\Users\Manasa\OneDrive\Desktop\telecom-gamification\public\win.png'
              alt="Winner Badge" 
              className="badge-image"
            />
            <p>You've earned a Feedback Champion badge!</p>
            <button onClick={handleCloseBadge}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;