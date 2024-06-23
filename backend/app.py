from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes and origins

openai.api_key = "sk-proj-sjbVpImSlCB7ohOk6yZfT3BlbkFJcAuV0pHxbojoSWFEKdTm"

@app.route('/ask_question', methods=['POST'])
def ask_question():
    #data = request.json
    #question = data.get('question')
    #print("this")
     
    
    question = "What does a Cholesterol 240 mg/dL mean for a male over 50"
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
        {
            "role": "system", "content": "You are a helpful assistant that uses the input text from the user to extract their blood test results."
        }, 
        {
            "role": "user", "content": f"Answer the following question in simple language:\n{question}"
        }
    ]
    )
    
    #answer = response['choices'][0]['message']['content'].strip()
    answer = response.choices[0].message
    #answer = re.search(r"content='(.*?)'", str(response))

    print(answer)
    return jsonify({"answer": str(answer)})
    

if __name__ == '__main__':
    app.run(debug=True)

