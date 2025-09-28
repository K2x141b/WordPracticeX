import { dispRightAnswer, displayQuestion, getInputTXT, hidePracticePage, uiEndPractice, } from "./prac.ui.js";
import { checkQuestion, answers, prepRightAnswer, endOfPractice } from "./prac.logic.js";
import { getWordPair } from "../wl-page/wl.logic.js";
import { showWLSelection } from "../wl-page/wl.ui.js";
let pracState = "QDISPLAYED";
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("Practice State:", pracState);
        if (pracState === "QDISPLAYED") {
            const userAns = getInputTXT();
            const checkedQ = checkQuestion(userAns);
            dispRightAnswer(checkedQ.isAnswerCorrect, checkedQ.correctAnswer);
            pracState = "ANSWERCHECKED";
            return;
        }
        if (pracState === "PRACTICEEND") {
            hidePracticePage();
            showWLSelection();
            pracState = "QDISPLAYED";
            return;
        }
        if (pracState !== "ANSWERCHECKED") {
            return;
        }
        const wP = getWordPair();
        if (wP === "EMPTY") {
            pracState = "PRACTICEEND";
            uiEndPractice(answers);
            endOfPractice();
            return;
        }
        const { question, qLeftCount } = prepRightAnswer(wP);
        displayQuestion(question, qLeftCount);
        pracState = "QDISPLAYED";
    }
});
hidePracticePage();
