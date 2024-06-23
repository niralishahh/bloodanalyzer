from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

HUME_API_KEY = 'agGNLkh7JsFU8fRWLQSUizHM7aEcIdrWaXXZr3J4cNvohjA6'
HUME_API_URL = 'https://api.hume.ai/v1/synthesize'

@app.route('/synthesize', methods=['POST'])
def synthesize():
    data = request.json
    text = data.get('text')
    
    if not text:
        return jsonify({"error": "Text is required"}), 400

    headers = {
        'Authorization': f'Bearer {HUME_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "text": text,
        "voice": "empathetic"
    }

    response = requests.post(HUME_API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        return jsonify({"error": "Failed to synthesize speech"}), 500

    audio_url = response.json().get('audio_url')

    return jsonify({"audio_url": audio_url})

if __name__ == '__main__':
    app.run(debug=True)
