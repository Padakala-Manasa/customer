import React, { useState, useEffect } from 'react';
import './Quiz.css';

const sampleQuestions = [
  { id: 1, question: "How satisfied are you with our service?" },
  { id: 2, question: "Would you recommend our service to others?" },
  { id: 3, question: "What improvements would you suggest?" }
];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError(error.message);
        setQuestions(sampleQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowBadge(true);
  };

  if (loading) {
    return <div className="quiz-container">Loading quiz questions...</div>;
  }

  return (
    <div className="quiz-container">
      <h2>Customer Feedback Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="quiz-question">
            <label>{index + 1}. {q.question}</label>
            <input type="text" placeholder="Your answer here" required />
          </div>
        ))}
        <button type="submit" className="quiz-submit">Submit</button>
      </form>

      {showBadge && (
        <div className="badge-popup">
          <div className="badge-content">
            <h3>Congratulations!</h3>
            <img 
              src={`${process.env.PUBLIC_URL}/win.png`} // Correct way to reference images in the public folder
              alt="Winner Badge" 
              className="badge-image"
            />
            <p>You've earned a feedback champion badge!</p>
            <button onClick={() => setShowBadge(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;