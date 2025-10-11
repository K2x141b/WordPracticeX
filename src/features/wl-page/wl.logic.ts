import { wlFilePaths } from "../../database/wl-file-paths.js";
import { settings } from "../set-page/set.logic.js";
import { shuffleWordList } from "./utils/wl.utils.js";
import type { LangKeys } from "../../database/wl-file-paths.js";

type Wordlist = [string, string][];

export type LabelData = {
  language: string;
  company: string;
  level: string;
  length: string;
};

interface IWordListManager {
  getWordList(WLGroup: string, wlFileName: string): void;
  getWordPair(): [string, string] | "EMPTY";
  addWordPair(answer: string, question: string): number;
  useSettings(): void;
}

export class WordListManager implements IWordListManager {
  private wordList: Wordlist = [["", ""]];
  currentWP: [string, string] = ["", ""];
  langToSpeak: [string, string] = ["", ""];

  async getWordList(WLGroup: LangKeys, wlFileName: string) {
    this.langToSpeak = wlFilePaths[WLGroup].settings
    try {
      const resp = await fetch(`../dist/database/${WLGroup}/${wlFileName}.json`);
      this.wordList = await resp.json();
    } catch {
      window.alert("Failed to get wordlist!");
    }
  }

  getWordPair(): [string, string] | "EMPTY" {
    const wP = this.wordList.shift();

    if (!wP) {
      return "EMPTY";
    }

    this.currentWP = wP;
    return wP; 
  }

  addWordPair(answer: string, question: string) {
    let wP: [string, string] = [answer, question];
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

export function parseLangLabel(label: string) {
  const parts = label.split("_");
  const EXPECTED_PART_COUNT = 4;

  if (parts.length !== EXPECTED_PART_COUNT) {
    throw new Error("parseLangLabel() failed");
  }

  const [language, company, level, length] = parts as [string, string, string, string];
  return { language, company, level, length };
}

export function parseWlLabel(label: string) {
  const parts = label.split("|");
  const EXPECTED_PART_COUNT = 2;

  if (parts.length !== EXPECTED_PART_COUNT) {
    throw new Error("parseWlLabel() failed");
  }

  const [parsedLabel, wordCount] = parts as [string, string];
  return { parsedLabel, wordCount };
}
