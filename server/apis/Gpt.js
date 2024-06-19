const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

router.post("/", async (req, res) => {
  const { messages } = req.body; 

  // Ensure messages array is an array of objects with role and content
  if (!Array.isArray(messages) || messages.some(msg => !msg.role || !msg.content)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  const userMessage = messages[messages.length - 1]; 

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPEN_AI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages.map(msg => ({ role: msg.role, content: msg.content })), // Pass all messages
      max_tokens: 50 
    })
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // Send OpenAI response back to frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
