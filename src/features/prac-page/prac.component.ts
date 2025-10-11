import {
  dispRightAnswer,
  displayQuestion,
  getInputTXT,
  hidePracticePage,
  uiEndPractice,
  showPracticePage,
  setWLLabel,
} from "./prac.ui.js";
import { QuestionLeftTracker, AnswerChecker, StatisticsManager, smartCheck, parseSmartString } from "./prac.logic.js";
import { showWLSelection, hideWLSelection } from "../wl-page/wl.ui.js";
import { dispWordLists } from "../wl-page/wl.component.js";
import { wlFilePaths } from "../../database/wl-file-paths.js";
import { WordListManager } from "../wl-page/wl.logic.js";
import type { LangKeys } from "../../database/wl-file-paths.js";
import { settings } from "../set-page/set.logic.js";
import { speakText } from "./utils/utils.js";

const wLManager = new WordListManager();
const qLeftTracker = new QuestionLeftTracker();
const statsManager = new StatisticsManager();
const ansChecker = new AnswerChecker(statsManager, qLeftTracker, wLManager);

export function onClickLangBtn(WLGroup: LangKeys) {
  dispWordLists(WLGroup, wlFilePaths[WLGroup]);
}

export async function onClickWlBtn(WLGroup: LangKeys, parsedWLLabel: string) {
  showPracticePage();
  hideWLSelection();

  console.log(parsedWLLabel);
  setWLLabel(parsedWLLabel);

  await wLManager.getWordList(WLGroup, parsedWLLabel);

  wLManager.useSettings();

  const questionsLeft = wLManager.getLengthOfWL();
  qLeftTracker.setQLeft(questionsLeft);

  displayQState.handleEnter();
}

interface PracticeState {
  handleEnter(): void;
}

class DisplayQState implements PracticeState {
  handleEnter() {
    const wP = wLManager.getWordPair();
    if (wP === "EMPTY") {
      uiEndPractice(statsManager.answers);
      statsManager.resetAnswers();
      practice.setState(practiceEndState);
      return;
    }
    const question = parseSmartString(wLManager.currentWP[1]); // Improve // Improve

    if (settings.reverseLists) {
      speakText(question, wLManager.langToSpeak[0], wLManager.langToSpeak[1]);
    }
    const questionsLeft = qLeftTracker.qLeft;
    displayQuestion(question, questionsLeft);

    practice.setState(checkAnswerState);
  }
}

class CheckAnswerState implements PracticeState {
  handleEnter() {
    const userAns = getInputTXT();
    const checkedQ = ansChecker.checkAnswer(userAns, wLManager.currentWP, smartCheck);
    if (checkedQ.isAnswerCorrect === true) qLeftTracker.decrement();
    dispRightAnswer(checkedQ.isAnswerCorrect, checkedQ.feedback);
    practice.setState(displayQState);
  }
}

class PracticeEndState implements PracticeState {
  handleEnter() {
    hidePracticePage();
    showWLSelection();
    practice.setState(checkAnswerState);
  }
}

class PracticeContext {
  state: PracticeState;

  constructor() {
    this.state = checkAnswerState;
  }

  setState(newState: PracticeState) {
    this.state = newState;
  }

  onEnter() {
    this.state.handleEnter();
  }
}

const displayQState = new DisplayQState();
const checkAnswerState = new CheckAnswerState();
const practiceEndState = new PracticeEndState();

export const practice = new PracticeContext();
