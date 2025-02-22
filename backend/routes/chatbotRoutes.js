// backend/routes/chatbotRoutes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /api/chatbot
router.post('/', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  try {
    // Replace 'GEMINI_API_KEY' in your .env file with your actual key.
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Construct the payload according to the API spec.
    const payload = {
      contents: [{
        parts: [{ text: query }]
      }]
    };

    const response = await axios.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Send the generated text back to the client.
    res.json({ reply: response.data });
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Error calling Gemini API' });
  }
});

export default router;
