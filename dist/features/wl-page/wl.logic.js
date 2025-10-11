import { wlFilePaths } from "../../database/wl-file-paths.js";
import { settings } from "../set-page/set.logic.js";
import { shuffleWordList } from "./utils/wl.utils.js";
export class WordListManager {
    wordList = [["", ""]];
    currentWP = ["", ""];
    langToSpeak = ["", ""];
    async getWordList(WLGroup, wlFileName) {
        this.langToSpeak = wlFilePaths[WLGroup].settings;
        try {
            const resp = await fetch(`../dist/database/${WLGroup}/${wlFileName}.json`);
            this.wordList = await resp.json();
        }
        catch {
            window.alert("Failed to get wordlist!");
        }
    }
    getWordPair() {
        const wP = this.wordList.shift();
        if (!wP) {
            return "EMPTY";
        }
        this.currentWP = wP;
        return wP;
    }
    addWordPair(answer, question) {
        let wP = [answer, question];
        const WLLength = this.wordList.push(wP);
        return WLLength;
    }
    getLengthOfWL() {
        return this.wordList.length;
    }
    useSettings() {
        const newList = shuffleWordList(this.wordList);
        this.wordList = newList;
        if (settings.reverseLists) {
            this.wordList.forEach(pair => [pair[0], pair[1]] = [pair[1], pair[0]]);
        }
        console.log("Wordlist: ", this.wordList);
    }
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
