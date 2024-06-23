import React, { useState } from 'react';

function Transform() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSynthesize = async () => {
    const response = await fetch('http://127.0.0.1:5000/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setAudioUrl(data.audio_url);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSynthesize}>Synthesize</button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}

export default Transform;
