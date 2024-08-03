from gtts import gTTS
import os

def text_to_speech(text, language='en'):
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("output.mp3")
    os.system("mpg321 output.mp3")

emotional_response = "Emotionally analyzed text from Hume API"
text_to_speech(emotional_response)
