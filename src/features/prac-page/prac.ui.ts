import { practice } from "./prac.component.js";

const inputFieldTXT = document.getElementById("prac-page__txt") as HTMLTextAreaElement;
const qTextDisp = document.getElementById("prac-page__q-disp")!;
const answerDisp = document.getElementById("prac-page__answer-disp")!;
const qLeftDisp = document.getElementById("prac-page__q-left")!;
const pracPanel = document.getElementById("prac-page")!;
const checkBtn = document.getElementById("prac-page__check-btn")!;
const pracWLLabel = document.getElementById("prac-page__wl-label")!;
const questionDiv = document.getElementById("prac-page__img-div")!;

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    practice.onEnter();
  }
});

checkBtn.addEventListener("click", () => {
  practice.onEnter();
});

hidePracticePage();

export function setWLLabel(currentWL: string) {
  pracWLLabel.innerText = currentWL.replace(/_/g, " ");
}

export function displayText(question: string) {
  qTextDisp.hidden = false;
  questionDiv.hidden = true;
  qTextDisp.innerText = question;
}

export function displayImage(question: string) {
  qTextDisp.hidden = true;
  questionDiv.hidden = false;

  const oldImg = questionDiv.querySelector("img");
  if (oldImg) oldImg.remove();

  const html =  `<img src="${question}" alt="Question Image" class="h-60">`
  questionDiv.insertAdjacentHTML("beforeend", html);
}

export function displayQuestion(question: string, qLeftCount: number) {
  answerDisp.innerText = "";
  inputFieldTXT.value = "";
  qLeftDisp.innerText = qLeftCount.toString();
  if (question.includes("\\")) {
    displayImage(question);
    return; // Improve
  }
  displayText(question);
}

export function getInputTXT() {
  return inputFieldTXT.value.trim();
}

export function dispRightAnswer(isAnswerCorrect: boolean, feedback: string) {
  answerDisp.innerText = feedback;
  if (isAnswerCorrect) {
    answerDisp.classList.add("text-lime-500", "dark:text-lime-400"); // Improve
    answerDisp.classList.remove("text-orange-500", "dark:text-orange-400");
    return;
  }
  answerDisp.classList.add("text-orange-500", "dark:text-orange-400");
  answerDisp.classList.remove("text-lime-500", "sdark:text-lime-400");
}

export function hidePracticePage() {
  pracPanel.hidden = true;
}

export function showPracticePage() {
  pracPanel.hidden = false;
}

export function uiEndPractice(answer: {total: number, wrong: number}) {
  answerDisp.innerText = `Du hast ${answer.wrong} von ${answer.total} Fragen falsch beantwortet.`;
}
