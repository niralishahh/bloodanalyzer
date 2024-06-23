from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import you

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes and origins

openai.api_key = "sk-proj-sjbVpImSlCB7ohOk6yZfT3BlbkFJcAuV0pHxbojoSWFEKdTm"

@app.route('/ask_question', methods=['POST'])
def ask_question():
    #data = request.json
    #question = data.get('question')
    #print("this")
    bt_dictionary = you.getDict() 
    #length = len(bt_dictionary)
    questions = [];
    for key in bt_dictionary.keys():
        question = f"What does a " + key + " value of " + bt_dictionary[key] + " mean for a male over 50"
        print(question)
        #need to add the input for gender and age
        questions.append(question)
        questions_string = ' '.join(questions)

    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
        {
            "role": "system", "content": "You are a helpful assistant that uses the input text from the user to extract their blood test results."
        }, 
        {
            "role": "user", "content": f"Answer the following question in simple language:\n{questions_string}"
        }
    ]
    )
    #answer = response['choices'][0]['message']['content'].strip()
    answer = response.choices[0].message
    #answer = re.search(r"content='(.*?)'", str(response))

    print(answer)
    return jsonify({"answer": str(answer)})

#print(you.getDict())



if __name__ == '__main__':
    app.run(debug=True)

