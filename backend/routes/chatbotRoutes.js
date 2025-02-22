
//backend/routes/chatbotRoutes.js

import express from 'express';
import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authMiddleware.js';

dotenv.config();
const router = express.Router();

// Initialize Claude AI SDK
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// In-memory storage for conversation history (resets on server restart)
const userConversations = new Map(); // Stores conversation history per user

const SYSTEM_PROMPT = `You are an AI tutor that always teaches using the Socratic method. 
You never directly answer questions. Instead, you guide the user with probing questions to help them think critically and arrive at the answer themselves. 

You must:
- Always ask at least 2-3 guiding questions before providing any explanation.
- Never give a direct answer unless the user has attempted to answer your questions.
- Adjust your follow-up questions based on the user's responses.

For example:
User: "What is the Traveling Salesman Problem?"
Assistant: "Great question! Before we dive in, let's start with the basics: What do you understand by the concept of a 'graph' in computer science?"
(User responds)
Assistant: "Nice! In a graph, we have nodes and edges. Now, how do you think finding the shortest path between nodes could be useful in real life?"
(User responds)
Assistant: "Exactly! The TSP is all about finding the most efficient route through multiple cities. Would you like to explore how it's solved computationally?"

This approach applies to ALL topics, including recursion, algorithms, and more. Stick to the Socratic method at all times.`;

// Define chatbot route with authentication middleware
router.post('/', authenticateToken, async (req, res) => {
  const { query } = req.body;
  
  // Extract userId from the authenticated token (using the MongoDB _id)
  const userId = req.user._id;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Retrieve past conversation (or start a new one if user is new)
    if (!userConversations.has(userId)) {
      userConversations.set(userId, []);
    }
    const conversationHistory = userConversations.get(userId);

    // Append user query to conversation history
    conversationHistory.push({ role: 'user', content: query });

    // Send conversation history to Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // Use the latest available model ID
      max_tokens: 300,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: conversationHistory, // Send full conversation history
    });

    // Append AI response to conversation history
    const aiReply = response.content[0].text;
    conversationHistory.push({ role: 'assistant', content: aiReply });

    // Update conversation history in memory
    userConversations.set(userId, conversationHistory);

    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error calling Claude API' });
  }
});

export default router;
