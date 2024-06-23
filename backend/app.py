from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import you

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes and origins

openai.api_key = "sk-proj-sjbVpImSlCB7ohOk6yZfT3BlbkFJcAuV0pHxbojoSWFEKdTm"
MSG_LIST = []
INPUT_LIST= []


@app.route('/ask_question', methods=['POST'])
def ask_question():
    #data = request.json
    #question = data.get('question')
    #print("this")
    bt_dictionary = you.getDict() 
    #length = len(bt_dictionary)
    questions = '';
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
            "role": "system", "content": "You are a helpful assistant that answers the questions with details on what each test means in a numbered list with each number on a different line. Replace all the \n with \n\n"
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
    MSG_LIST = str(answer.content.strip()).split('\n')
    print(MSG_LIST)
    msg_print= ''
    for i in MSG_LIST:
        print(i) 
    

    return jsonify({"answer": str(answer)})

#print(you.getDict())


@app.route('/get_rec', methods=['POST'])
def get_rec():
    data = request.json
    lastResponse = data.get('lastR')
    print('')
    # You are a helpful assistant that mentions any alarming results and gives reccomendations based on {lastResponse}, while also not repeating that text, that are not at the normal level, give home remidies, and potential risks
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
        {
            "role": "system", "content": "You are a helpful assistant so that whichever blood test results that are not unhealthy, give possible side effects and small, specific lifestyle modifications. Do not mention normal results at all. Repeat for all possible risks and bad test results."
        },
        {
            "role": "user", "content": f"Answer the following question in simple language without repeating any information from this text:{lastResponse}"
        }
        ]
    )
    #answer = response['choices'][0]['message']['content'].strip()
    answer = response.choices[0].message
    #answer = re.search(r"content='(.*?)'", str(response))
    
    print(answer)
    INPUT_LIST = str(answer.content.strip()).split('\n')
    print(INPUT_LIST)
    msg_print= ''
    for i in INPUT_LIST:
        print(i) 

    return jsonify({"answer": str(answer)})


def getMsgList():
    return MSG_LIST


if __name__ == '__main__':
    app.run(debug=True)

