import type { WordListManager } from "../wl-page/wl.logic.js";

interface IQuestionLeftTracker {
  setQLeft(ql: number): void;
  decrement(): void;
}

export class QuestionLeftTracker implements IQuestionLeftTracker {
  qLeft = 0;

  setQLeft(qL: number) {
    this.qLeft = qL;
  }

  decrement() {
    this.qLeft--;
  }
}

export function strictCheck(userAnswer: string, rightAnswer: string): boolean {
  return userAnswer === rightAnswer ? true : false;
}

export function parseSmartString(label: string): string {
  return label.split("|")[0]!.replace(/(\?,)/g, ","); // Improve
}

export function smartCheck(userAnswer: string, rightAnswer: string): [boolean, string] {
  const multipleAns = rightAnswer.replace(/(\?,)/g, ",").split("|");
  // add a thing that checks for "()"
  if (multipleAns[0] === userAnswer) {
    return [true, "Deine Antwort stimmt!"];
  }

  for (const rightAns of multipleAns) {
    if (rightAns === userAnswer) {
      return [true, multipleAns[0]!]; // Improve
    }
  }

  const multiPossibleAns = rightAnswer.split(/(\?,)/g);

  for (const aRightAns of multiPossibleAns) {
    if (userAnswer.includes(aRightAns)) {
      return [true, rightAnswer.replace(/(\?,)/g, ",")];
    }
  }

  return [false, multipleAns[0]!.replace(/(\?,)/g, ",")]; // Improve
}

export class AnswerChecker {
  constructor(
    private stats: IStatisticsManager,
    private qTracker: IQuestionLeftTracker,
    private wordListManager: WordListManager
  ) {}

  checkAnswer(userAnswer: string, wordPair: [string, string], checker: Function) {
    const [isAnswerCorrect, feedback] = checker(userAnswer, wordPair[0]);

    if (!isAnswerCorrect) {
      const newWLLength = this.wordListManager.addWordPair(wordPair[0], wordPair[1]);
      this.qTracker.setQLeft(newWLLength);
      this.stats.didMistake();
    } else {
      this.stats.didRight();
    }

    return {
      isAnswerCorrect: isAnswerCorrect,
      feedback: feedback,
    };
  }
}

interface IStatisticsManager {
  didMistake(): void;
  didRight(): void;
  resetAnswers(): void;
}

export class StatisticsManager implements IStatisticsManager {
  answers = { total: 0, wrong: 0 };

  didMistake() {
    this.answers.wrong++;
    console.log("wrong:", this.answers.wrong)
    console.log("total:", this.answers.total)
  }

  didRight() {
    this.answers.total++;
    console.log("wrong:", this.answers.wrong)
    console.log("total:", this.answers.total)
  }

  resetAnswers() {
    this.answers.total = 0;
    this.answers.wrong = 0;
  }
}