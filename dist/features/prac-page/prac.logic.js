export class QuestionLeftTracker {
    qLeft = 0;
    setQLeft(qL) {
        this.qLeft = qL;
    }
    decrement() {
        this.qLeft--;
    }
}
export function strictCheck(userAnswer, rightAnswer) {
    return userAnswer === rightAnswer ? true : false;
}
export function parseSmartString(label) {
    return label.split("|")[0].replace(/(\?,)/g, ","); // Improve
}
export function smartCheck(userAnswer, rightAnswer) {
    const multipleAns = rightAnswer.replace(/(\?,)/g, ",").split("|");
    // add a thing that checks for "()"
    if (multipleAns[0] === userAnswer) {
        return [true, "Deine Antwort stimmt!"];
    }
    for (const rightAns of multipleAns) {
        if (rightAns === userAnswer) {
            return [true, multipleAns[0]]; // Improve
        }
    }
    const multiPossibleAns = rightAnswer.split(/(\?,)/g);
    for (const aRightAns of multiPossibleAns) {
        if (userAnswer.includes(aRightAns)) {
            return [true, rightAnswer.replace(/(\?,)/g, ",")];
        }
    }
    return [false, multipleAns[0].replace(/(\?,)/g, ",")]; // Improve
}
export class AnswerChecker {
    stats;
    qTracker;
    wordListManager;
    constructor(stats, qTracker, wordListManager) {
        this.stats = stats;
        this.qTracker = qTracker;
        this.wordListManager = wordListManager;
    }
    checkAnswer(userAnswer, wordPair, checker) {
        const [isAnswerCorrect, feedback] = checker(userAnswer, wordPair[0]);
        if (!isAnswerCorrect) {
            const newWLLength = this.wordListManager.addWordPair(wordPair[0], wordPair[1]);
            this.qTracker.setQLeft(newWLLength);
            this.stats.didMistake();
        }
        else {
            this.stats.didRight();
        }
        return {
            isAnswerCorrect: isAnswerCorrect,
            feedback: feedback,
        };
    }
}
export class StatisticsManager {
    answers = { total: 0, wrong: 0 };
    didMistake() {
        this.answers.wrong++;
        console.log("wrong:", this.answers.wrong);
        console.log("total:", this.answers.total);
    }
    didRight() {
        this.answers.total++;
        console.log("wrong:", this.answers.wrong);
        console.log("total:", this.answers.total);
    }
    resetAnswers() {
        this.answers.total = 0;
        this.answers.wrong = 0;
    }
}
