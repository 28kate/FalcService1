
import React, { useEffect, useRef, useState } from 'react';
import './Gpt.css';

export default function Gpt() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hello, how can I help?" },
  ]);

  const [prompt, setPrompt] = useState('');
  const listRef = useRef(null);

  
  const onSend = async () => {
    const userMessage = { role: 'user', content: prompt };
    setMessages((existingMessages) => [...existingMessages, userMessage]);
    setPrompt('');

    try {
      const response = await fetch('http://localhost:3001/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const resultJSON = await response.json();
      const answer = resultJSON.choices && resultJSON.choices.length > 0 ? resultJSON.choices[0].message : null;
      if (answer) {
        setMessages((existingMessages) => [...existingMessages, answer]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='app-container'>
      <div className='app'>
        <section className='side-bar'>
          <button onClick={() => setMessages([])}> + New chat</button>
          <nav className='nav'>
            <p>Falcorp</p>
          </nav>
        </section>
        <section className='main'>
          <h1>FalcorpGPT</h1>
          <ul className='feed' ref={listRef}>
            {messages.map((msg, index) => (
              <li key={index} className={`message ${msg.role}`}>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
          <div className='bottom-section'>
            <div className='input-container'>
              <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='How can I help you?' />
              <div onClick={onSend} className='submit-button'>➣</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
