import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTypewriter from './useTypeWriter';

function AskQuestion() {
  const [rawMessage, setRawMessage] = useState('');
  const [rawMessage2, setRawMessage2] = useState('');
  const [combinedMessage, setCombinedMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/ask_question');
      const answer = response.data.answer;
      const match = answer.match(/content='([^']*)'/);
      if (match) {
        const content = match[1];
        const cleanContent = content.replaceAll('\\n', '<br>');
        setRawMessage(cleanContent);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/get_rec', { lastR: rawMessage });
      const answer2 = response.data.answer;
      const match2 = answer2.match(/content='([^']*)'/);
      if (match2) {
        const content2 = match2[1];
        const cleanContent2 = content2.replaceAll('\\n', '<br>');
        setRawMessage2(cleanContent2);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    if (rawMessage) {
      handleAdd();
    }
  }, [rawMessage]);

  useEffect(() => {
    if (rawMessage && rawMessage2) {
      setCombinedMessage(`${rawMessage}<br><br>${rawMessage2}`);
    }
  }, [rawMessage, rawMessage2]);

  const messageWithTypewriterEffect = useTypewriter(combinedMessage);

  return (
    <div>
      <button onClick={handleSubmit}>Click to get Result Summary</button>
      <h2>Summary</h2>
      {combinedMessage && <p dangerouslySetInnerHTML={{ __html: messageWithTypewriterEffect }}></p>}
    </div>
  );
}

export default AskQuestion;
