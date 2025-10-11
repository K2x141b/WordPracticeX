export function shuffleWordList(wordList: [string, string][]): [string, string][] {
  console.log(wordList);
  const shuffled = [...wordList]; // copy to avoid mutating original

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]; // swap
  }

  return shuffled;
}

export function speakText(text: string, voiceName = "Google Deutsch", language = "de-DE") {
    if (!("speechSynthesis" in window)) {
      console.error("Text-to-Speech is not supported in this browser.");
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
  
    if (voices.length === 0) {
      console.error("No voices available. Try again later.");
      return;
    }
    
    // Find the specific voice
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        console.warn(`Voice "${voiceName}" not found. Using default voice.`);
    }
  
    utterance.lang = utterance.voice ? utterance.voice.lang : language;
    utterance.pitch = 0.9;
    utterance.rate = 0.9;
    utterance.volume = 0.8;
  
    window.speechSynthesis.speak(utterance);
}