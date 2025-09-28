const wlPanel = document.getElementById("wl-page");
export function addLangBtn(unparsedLabel, label, company, level, length) {
    const html = `<button id='wl-page__${unparsedLabel}'>${label}
                <p>${level}</p>
                <p>${length} Übungen</p>
                <p>${company}</p>
                </button>`;
    wlPanel.insertAdjacentHTML("beforeend", html);
}
export function addWlBtn(unparsedLabel, wlLabel, wordCount) {
    const html = `<button id='wl-page__${unparsedLabel}'>${wlLabel}
                <p>${wordCount} Wörter</p>
                </button>`;
    wlPanel.insertAdjacentHTML("beforeend", html);
}
export function hideWLSelection() {
    wlPanel.hidden = true;
}
export function showWLSelection() {
    wlPanel.hidden = false;
}
export function clearWlBtns() {
    wlPanel.innerHTML = "";
}
