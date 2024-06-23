/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AskQuestion() {
  //const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');


  const handleSubmit = async () => {
    try {
      //const fixedQuestion = "What does a Cholesterol 240 mg/dL mean for a male over 50";
      const response = await axios.post('http://127.0.0.1:5000/ask_question');

        
        
          // Access the content directly if the response is a JSON object
      const answer = response.data.answer
      //console.log(answer)
      const match = answer.match(/content='([^']*)'/);
      const simplfy = await axios.post('http://127.0.0.1:5000/get_string', {data: match});

      //console.log(match)
      if (match) {
        const content = match[1]; // Use 'let' to allow reassignment
        // content = content.replaceAll('/n', '<br>');
        //content = content.replaceAll('\n\n', '<br><br>');
        console.log(content);
        setMessage(content)
      //      // Use `content` as needed
      //} else {
      //  console.log("Content not found");
      }
    } 
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const handleAdd = async () => {
    try{
        //const fixedQuestion = "What does a Cholesterol 240 mg/dL mean for a male over 50";
      const response = await axios.post('http://127.0.0.1:5000/get_rec', { lastR: message });
      const answer2 = response.data.answer
      console.log(answer2)
      const match2 = answer2.match(/content='([^']*)'/);
      //console.log(match)
      if (match2) {
        const content2 = match2[1];
        console.log(content2);
        setMessage2(content2)
      //      // Use `content` as needed
      //} else {
      //  console.log("Content not found");
      }
    }
    catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
    }
        
      
    };
    // Use useEffect to call handleAdd when message is updated
  useEffect(() => {
    if (message) {
      handleAdd();
    }
  }, [message]);


    return (
        <div>
            <h1>Get Summary</h1>
            <button onClick = {handleSubmit}>Submit</button>
            {{message} && <p>{message}</p>}
            {{message2} && <p>{message2}</p>}
            
            
        </div>
    );
}

export default AskQuestion;

*/
