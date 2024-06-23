import React, { useState } from 'react';
import axios from 'axios';

function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const fixedQuestion = "What does a Cholesterol 240 mg/dL mean for a male over 50";
      const response = await axios.post('http://127.0.0.1:5000/ask_question', { question: fixedQuestion });
            //question = "What does a Cholesterol 240 mg/dL mean for a male over 50";
            //const response = await axios.post('http://127.0.0.1:5000/ask_question', {question})
            //setAnswer(response.data.answer);
            /*
            const match = response.match(/content='([^']*)'/);

            if (match) {
              const content = match[1];
              console.log(content);
              setAnswer(content)
            }
            else {
              console.log("Content not found");
            }
            */
        
          // Access the content directly if the response is a JSON object
      const answer = response.data.answer
      //console.log(answer)
      const match = answer.match(/content='([^']*)'/);
      //console.log(match)
      if (match) {
        const content = match[1];
        console.log(content);
        setMessage(content)
      //      // Use `content` as needed
      //} else {
      //  console.log("Content not found");
      }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    return (
        <div>
            <h1>Get Summary</h1>
            <button onClick = {handleSubmit}>Submit</button>
            {{message} && <p>{message}</p>}
        </div>
    );
}

export default AskQuestion;