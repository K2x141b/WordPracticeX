import { addWordPair } from "../wl-page/wl.logic.js";

type WordPair = [string, string] | "EMPTY";

let qLeft = 0;
let wordPair: WordPair;
export let answers = { total: 0, wrong: 0 };

export function prepRightAnswer(wP: [string, string]) {
  qLeft--;
  wordPair = wP;

  return {
    question: wP[0],
    qLeftCount: qLeft,
  };
}

export function checkQuestion(userAnswer: string) {
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

export function setQLeft(qL: number) {
  qLeft = qL;
}

export function endOfPractice() {
  answers.total = 0;
  answers.wrong = 0;
}