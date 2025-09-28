export function shuffleLists(list1, list2) {
    if (list1.length !== list2.length) {
        throw new Error("Both lists must have the same length");
    }
    // Combine into pairs safely
    const pairs = list1.map((item, i) => [item, list2[i]]);
    // Fisher-Yates shuffle using temporary variable
    const shuffledPairs = [];
    const usedIndices = new Set();
    while (shuffledPairs.length < pairs.length) {
        const idx = Math.floor(Math.random() * pairs.length);
        if (!usedIndices.has(idx)) {
            shuffledPairs.push(pairs[idx]);
            usedIndices.add(idx);
        }
    }
    // Split back into separate lists
    const shuffled1 = shuffledPairs.map(p => p[0]);
    const shuffled2 = shuffledPairs.map(p => p[1]);
    return [shuffled1, shuffled2];
}
export function speakText(text, voiceName = "Google Deutsch", language = "de-DE") {
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
    }
    else {
        console.warn(`Voice "${voiceName}" not found. Using default voice.`);
    }
    utterance.lang = utterance.voice ? utterance.voice.lang : language;
    utterance.pitch = 0.9;
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
}
