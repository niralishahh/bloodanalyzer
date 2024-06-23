import { useState, useEffect } from 'react';

function useTypewriter(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset displayed text when the input text changes
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(currentIndex));
      currentIndex += 1;

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
}

export default useTypewriter;
