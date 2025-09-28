const inputFieldTXT = document.getElementById("prac-page__txt") as HTMLTextAreaElement;
const questionDisp = document.getElementById("prac-page__q-disp")!;
const answerDisp = document.getElementById("prac-page__answer-disp")!;
const qLeftDisp = document.getElementById("prac-page__q-left")!;
const pracPanel = document.getElementById("prac-page")!;

export function displayQuestion(question: string, qLeftCount: number) {
  answerDisp.innerText = "";
  inputFieldTXT.value = "";
  qLeftDisp.innerText = qLeftCount.toString();
  questionDisp.innerText = question;
}

export function getInputTXT() {
  return inputFieldTXT.value.trim();
}

export function dispRightAnswer(isAnswerCorrect: boolean, correctAnswer: string) {
  if (isAnswerCorrect) {
    answerDisp.innerText = "Your answer is correct!";
    return;
  }
  answerDisp.innerText = correctAnswer;
}

export function hidePracticePage() {
  pracPanel.hidden = true;
}

export function showPracticePage() {
  pracPanel.hidden = false;
}

export function uiEndPractice(answer: {total: number, wrong: number}) {
  answerDisp.innerText = `Du hast ${answer.wrong} von ${answer.total} Fragen richtig beantwortet.`;
}
