const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample badge data
const badges = [
  { id: 1, name: 'First Badge', description: 'Awarded for completing your first quiz!' },
  { id: 2, name: 'Quiz Master', description: 'Achieved after answering 10 quizzes correctly.' },
  { id: 3, name: 'Feedback Contributor', description: 'Given for providing valuable feedback.' },
  { id: 4, name: 'Suggestions Champion', description: 'Earned for submitting helpful suggestions.' },
  { id: 5, name: 'Engagement Enthusiast', description: 'Secured by participating in community discussions.' },
];

// Sample quiz data
const questions = [
  { id: 1, question: "How satisfied are you with your current telecom plan?", type: "rating" },
  { id: 2, question: "Would you be interested in additional data bundles?", type: "interest" },
  { id: 3, question: "How frequently do you use international calling?", type: "usage" },
  { id: 4, question: "Have you considered upgrading your current plan?", type: "modification" },
  { id: 5, question: "Rate your experience with our customer support.", type: "rating" },
  { id: 6, question: "Would you like more flexible plan options?", type: "interest" },
];

// Endpoints
app.get('/badges', (req, res) => {
  res.json(badges);
});

app.get('/api/quiz', (req, res) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, 5);
  res.json(selectedQuestions);
});

// Feedback submission endpoint
app.post('/feedback', (req, res) => {
  const { email, feedback } = req.body;

  // Validate email format
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  // Validate feedback
  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required.' });
  }

  // Log feedback to the console
  console.log(`Feedback received from ${email}: ${feedback}`);

  // Respond with success message
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

// Suggestions submission endpoint
app.post('/suggestions', (req, res) => {
  const { suggestion, email } = req.body;

  // Validate suggestion and email
  if (!suggestion) {
    return res.status(400).json({ message: 'Suggestion is required.' });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  // Log suggestion to the console
  console.log(`Suggestion received from ${email}: ${suggestion}`);

  // Respond with success message
  res.status(201).json({ message: 'Suggestion submitted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});