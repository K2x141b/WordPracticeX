import { addWordPair } from "../wl-page/wl.logic.js";
let qLeft = 0;
let wordPair;
export let answers = { total: 0, wrong: 0 };
export function prepRightAnswer(wP) {
    qLeft--;
    wordPair = wP;
    return {
        question: wP[0],
        qLeftCount: qLeft,
    };
}
export function checkQuestion(userAnswer) {
    const rightAnswer = wordPair[1];
    if (userAnswer !== rightAnswer) {
        const newWLLength = addWordPair(wordPair[0], wordPair[1]);
        qLeft = newWLLength + 1;
        answers.wrong++;
    }
    answers.total++;
    return {
        isAnswerCorrect: userAnswer === rightAnswer,
        correctAnswer: rightAnswer,
    };
}
export function setQLeft(qL) {
    qLeft = qL;
}
export function endOfPractice() {
    answers.total = 0;
    answers.wrong = 0;
}
