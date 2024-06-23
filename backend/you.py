import requests
import openai
import PyPDF2

openai.api_key = "sk-proj-yVoV9rJjXLmdB5haL8jNT3BlbkFJa692FJ0bCBXOkC1YPxDO"


data_file = 'data/data.txt'

def extract_text_from_pdf(pdf_path):
    text = ''
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    return text

pdf_path = 'pdfs/new_blood_test_report_with_age_sex.pdf'
extracted_text = extract_text_from_pdf(pdf_path)

sample_path = 'pdfs/blood_test_report_with_age_sex.pdf'
sample_text = extract_text_from_pdf(sample_path)

# Example usage
example_output = "34, 'Male', Hemoglobin: 13.5g/dL \n WBC: 7.0*10^9/L \n Platelets: 250*10/L \n Cholesterol: 240mg/dL \n Glucose: 150 mg/DL \n Vitamin D: 30 ng/mL \n RBC: 5.0*10^12/L \n Iron: 60 μg/dL" 
prompt = (
        f"Context: {sample_text}\n"
        f"Example Output: {example_output}\n\n"
        f"Question: {extracted_text}\n"
        f"Answer:"
    )

response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages= [
      {
        "role": "system", "content": "You are a helpful assistant that uses the input text from the user to extract their blood test results. Please include their age and sex first in that order (not prompt necessary like Age: value). Please remove any bullet points, other personal information about the patient, and any other text that is not necessary. Remove the bullet points and just create a new line for each test. Please add a colon after the name of each test, age, or sex to separate them from the values."
      }, 
      {
        "role": "user", "content": f"{extracted_text}"
      }
    ]
)

# print(extracted_text)

answers = response.choices[0].message.content.strip()

print(answers)

def saveResponseToFile(msg):
    with open(data_file, 'w') as file:
        for line in msg.split('\n'):
            file.write(line.strip() + '\n')
        print('Succeeded')

saveResponseToFile(answers)

age_sex = []

def creatingDictionary(data_file):
    data = {}
    
    count = 0
    with open(data_file, 'r') as file:
        count = 0
        for line in file:
        # Split the line into key and value (assuming a format like "key: value")
            parts = line.strip().split(':')
            if len(age_sex) < 2:
                value = parts[0].strip()
                age_sex.append(value)
                count += 1

            else:
                key = parts[0].strip()
                print(key)
                value = parts[1].strip()
                print(value)
                # Add key-value pair to the dictionary
                data[key] = value
    return data

dict = creatingDictionary(data_file)

def get_age_sex():
    return age_sex
print(dict)