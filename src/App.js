
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTypewriter from './useTypeWriter';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>

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
      setCombinedMessage(`${rawMessage}<br>
      <h4>The number corresponds to the row number assigned in the blood test</h4>
      <br>${rawMessage2}`);
    }
  }, [rawMessage, rawMessage2]);

  const messageWithTypewriterEffect = useTypewriter(combinedMessage);

  return (
    <div>
      <button onClick={handleSubmit} className="click-result">Get Result Summary!</button>
      {combinedMessage && <p dangerouslySetInnerHTML={{ __html: messageWithTypewriterEffect }}></p>}
    </div>
  );
}

export default AskQuestion;



