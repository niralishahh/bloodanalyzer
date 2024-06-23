from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import you
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes and origins

openai.api_key = "sk-proj-sjbVpImSlCB7ohOk6yZfT3BlbkFJcAuV0pHxbojoSWFEKdTm"
MSG_LIST = []
INPUT_LIST= []

UPLOAD_FOLDER = 'pdfs'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    pdf_name=file.filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        # Perform operations on the file here
        new_file="name.txt"
        with open(new_file, "w") as name:
            name.write(pdf_name)
        return jsonify({'message': 'File successfully uploaded'}), 200
    



@app.route('/ask_question', methods=['POST'])
def ask_question():
    #data = request.json
    #question = data.get('question')
    #print("this")
    bt_dictionary = you.getDict() 
    #length = len(bt_dictionary)
    questions = ''
    for key in bt_dictionary.keys():
        question = f"What does a " + key + " value of " + bt_dictionary[key] + " mean for a male over 50"
        #question = f"Is " + bt_dictionary[key] + " a normal value for" + key  + " for a male over 50. And what are the normal ranges for " + key

        #print(question)
        #need to add the input for gender and age
        #questions.append(question)
        questions = questions + question
    #questions_string = ' '.join(questions)

    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
        {
            "role": "system", "content": "You are a helpful assistant that answers the questions with details on what each test means in a numbered list with each number on a different line. Limit your response to 200 characters."
            #in bullet points for each type of test
        }, 
        {
            "role": "user", "content": f"Answer the following question in simple language:\n{questions}"
        }
        
        ]
        
    )
    #answer = response['choices'][0]['message']['content'].strip()
    answer = response.choices[0].message
    #answer = re.search(r"content='(.*?)'", str(response))
    
    print(answer)
    ANSWER = str(answer.content.strip())
    MSG_LIST = str(answer.content.strip()).split('\n')
    #print(MSG_LIST)

    return jsonify({"answer": str(answer)})

#print(you.getDict())


@app.route('/get_rec', methods=['POST'])
def get_rec():
    data = request.json
    lastResponse = data.get('lastR')
    #print('')
    # You are a helpful assistant that mentions any alarming results and gives reccomendations based on {lastResponse}, while also not repeating that text, that are not at the normal level, give home remidies, and potential risks
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
        {
            "role": "system", "content": "You are a helpful assistant. Given a set of test results, focus on generating potential risks and ways to mitigate dangers only for the unhealthy or abnormal results. Omit any information related to normal test results. Provide actionable advice for each unhealthy result to help the recipient understand the potential risks and how to address them effectively."
        },
        {
            "role": "user", "content": f"Answer the following question in simple language without repeating any information from this text:{lastResponse}"
        }
        ]

    )
    #answer = response['choices'][0]['message']['content'].strip()
    answer = response.choices[0].message
    #print()
    #print(answer)
    #answer = re.search(r"content='(.*?)'", str(response))
    
    #INPUT_LIST = str(answer.content.strip()).split('\n')
    #print(INPUT_LIST)

    return jsonify({"answer": str(answer)})


def getMsgList():
    return MSG_LIST

def getInputList():
    return INPUT_LIST


if __name__ == '__main__':
    app.run(debug=True, port=5001)

#ask_question()
#get_rec()


