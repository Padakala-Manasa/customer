const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Define Mongoose Schemas
const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  feedback: { type: String, required: true },
});

const suggestionSchema = new mongoose.Schema({
  suggestion: { type: String, required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
const Suggestion = mongoose.model('Suggestion', suggestionSchema);

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

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (like Gmail)
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email from .env
    pass: process.env.EMAIL_PASS, // Replace with your email password or app password from .env
  },
});

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
app.post('/feedback', async (req, res) => {
  const { email, feedback } = req.body;

  if (!email || !feedback) {
    return res.status(400).json({ message: 'Email and feedback are required.' });
  }

  try {
    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save(); // Save feedback to MongoDB

    // Send feedback via email
    const mailOptions = {
      from: email,
      
      to: process.env.EMAIL_USER, // Replace with your email to receive feedback
      subject: 'New Feedback from Customer',
      text: `Feedback: ${feedback}\nFrom: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error saving feedback', error });
  }
});

// Suggestions endpoints
app.get('/suggestions', async (req, res) => {
  try {
    const allSuggestions = await Suggestion.find(); // Retrieve all suggestions from MongoDB
    res.json(allSuggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving suggestions', error });
  }
});

app.post('/suggestions', async (req, res) => {
  const { suggestion } = req.body;

  if (!suggestion) {
    return res.status(400).json({ message: 'Suggestion is required.' });
  }

  try {
    const newSuggestion = new Suggestion({ suggestion });
    await newSuggestion.save(); // Save the suggestion to MongoDB
    res.status(201).json({ message: 'Suggestion submitted successfully', suggestion: newSuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Error saving suggestion', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});