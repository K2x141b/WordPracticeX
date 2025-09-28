import { setQLeft } from "../prac-page/prac.logic.js";
import { settings } from "../set-page/set.logic.js";
import { shuffleLists } from "./utils/wl.utils.js";
let wordList;
export function useSettings() {
    const [answers, questions] = shuffleLists(wordList.answers, wordList.questions);
    wordList.answers = answers;
    wordList.questions = questions;
    if (settings.reverseLists) {
        const temp = wordList.answers;
        wordList.answers = wordList.questions;
        wordList.questions = temp;
    }
    console.log("Wordlist: ", wordList);
}
export async function getWordList(wlFileName) {
    try {
        const resp = await fetch(`../database/Französisch_DisDonc_Prim/${wlFileName}.json`);
        wordList = await resp.json();
        setQLeft(wordList.answers.length + 1);
    }
    catch {
        window.alert("Failed to get wordlist!");
    }
}
export function getWordPair() {
    const answer = wordList.answers.shift();
    const question = wordList.questions.shift();
    return answer && question ? [answer, question] : "EMPTY";
}
export function addWordPair(answer, question) {
    const WLLength = wordList.answers.push(answer);
    wordList.questions.push(question);
    return WLLength;
}
export function parseLangLabel(label) {
    const parts = label.split("_");
    const EXPECTED_PART_COUNT = 4;
    if (parts.length !== EXPECTED_PART_COUNT) {
        throw new Error("parseLangLabel() failed");
    }
    const [language, company, level, length] = parts;
    return { language, company, level, length };
}
export function parseWlLabel(label) {
    const parts = label.split("|");
    const EXPECTED_PART_COUNT = 2;
    if (parts.length !== EXPECTED_PART_COUNT) {
        throw new Error("parseWlLabel() failed");
    }
    const [parsedLabel, wordCount] = parts;
    return { parsedLabel, wordCount };
}
