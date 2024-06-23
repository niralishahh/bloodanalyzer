'''
from google.cloud import translate_v2 as translate

def translate_to_spanish(text):
    client = translate.Client()
    result = client.translate(text, target_language='es')
    return result['translatedText']

if __name__ == "__main__":
    text = "I am super tired"
    translated_text = translate_to_spanish(text)
    print(f'Translated text: {translated_text}')
'''

import os
from google.cloud import translate_v2

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "AIzaSyAk_i-2EXPLA2CPFn3WRsThobKhCJmSjiI"

translate_client = translate_v2.Client()

text = "hola"

target = "en"

output = translate_client.translate(text, target_language=target)

print(output)


def translateText(language_symbol, text):
    try:
        translator = Translator()
        translation = translator.translate(text, src="en", dest=language_symbol)
        if not translation: 
            return "unable to be translated"
        translation
    except Exception as e:
        print(f"Translation error: {e}")
        return None

# print(translateText("es", "boy"))
