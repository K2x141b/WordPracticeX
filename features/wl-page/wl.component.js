import { addWlBtn, hideWLSelection, addLangBtn, clearWlBtns } from "./wl.ui.js";
import { displayQuestion, showPracticePage } from "../prac-page/prac.ui.js";
import { getWordList, getWordPair, parseLangLabel, parseWlLabel } from "./wl.logic.js";
import { prepRightAnswer } from "../prac-page/prac.logic.js";
import { wlFilePaths } from "../../database/wl-file-paths.js";
import { useSettings } from "./wl.logic.js";
const langLabels = Object.keys(wlFilePaths);
export function displayLangs() {
    clearWlBtns();
    for (const langLabel of langLabels) {
        const { language, company, level, length } = parseLangLabel(langLabel);
        addLangBtn(langLabel, language, company, level, length);
        document.getElementById(`wl-page__${langLabel}`)?.addEventListener("click", async () => {
            dispWordLists(wlFilePaths.Französisch_DisDonc_Prim_11);
        });
    }
}
function dispWordLists(wordLists) {
    clearWlBtns();
    for (const label of wordLists.paths) {
        const { parsedLabel, wordCount } = parseWlLabel(label);
        addWlBtn(label, parsedLabel, wordCount);
        document.getElementById(`wl-page__${label}`)?.addEventListener("click", async () => {
            showPracticePage();
            hideWLSelection();
            await getWordList(parsedLabel);
            useSettings();
            const wP = getWordPair();
            if (wP === "EMPTY")
                return;
            const { question, qLeftCount } = prepRightAnswer(wP);
            displayQuestion(question, qLeftCount);
        });
    }
}
displayLangs();
