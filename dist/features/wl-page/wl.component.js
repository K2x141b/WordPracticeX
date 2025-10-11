import { addWlBtn, addLangBtn, clearWlBtns } from "./wl.ui.js";
import { parseLangLabel, parseWlLabel } from "./wl.logic.js";
import { wlFilePaths } from "../../database/wl-file-paths.js";
import { onClickLangBtn, onClickWlBtn } from "../prac-page/prac.component.js";
const langLabels = Object.keys(wlFilePaths);
export function displayLangs() {
    clearWlBtns();
    for (const langLabel of langLabels) {
        const { language, company, level, length } = parseLangLabel(langLabel);
        addLangBtn(langLabel, language, company, level, length);
        document.getElementById(`wl-page__${langLabel}`)?.addEventListener("click", async () => {
            onClickLangBtn(langLabel);
        });
    }
}
export function dispWordLists(WLGroup, wordLists) {
    clearWlBtns();
    for (const label of wordLists.paths) {
        const { parsedLabel, wordCount } = parseWlLabel(label);
        addWlBtn(label, parsedLabel, wordCount);
        document.getElementById(`wl-page__${label}`)?.addEventListener("click", async () => {
            onClickWlBtn(WLGroup, parsedLabel);
        });
    }
}
displayLangs();
