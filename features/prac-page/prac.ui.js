const inputFieldTXT = document.getElementById("prac-page__txt");
const questionDisp = document.getElementById("prac-page__q-disp");
const answerDisp = document.getElementById("prac-page__answer-disp");
const qLeftDisp = document.getElementById("prac-page__q-left");
const pracPanel = document.getElementById("prac-page");
export function displayQuestion(question, qLeftCount) {
    answerDisp.innerText = "";
    inputFieldTXT.value = "";
    qLeftDisp.innerText = qLeftCount.toString();
    questionDisp.innerText = question;
}
export function getInputTXT() {
    return inputFieldTXT.value.trim();
}
export function dispRightAnswer(isAnswerCorrect, correctAnswer) {
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
export function uiEndPractice(answer) {
    answerDisp.innerText = `Du hast ${answer.wrong} von ${answer.total} Fragen richtig beantwortet.`;
}
