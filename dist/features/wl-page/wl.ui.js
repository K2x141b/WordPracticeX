const wlPanel = document.getElementById("wl-page");
const wlPanelDiv = document.getElementById("wl-page__div");
export function addLangBtn(unparsedLabel, language, schoolPublisher, school, wordCount) {
    const html = `<button id='wl-page__${unparsedLabel}' class="p-7 m-4 bg-zinc-50 shadow-md hover:shadow-lg text-zinc-600 border-zinc-200 dark:bg-zinc-600 dark:text-zinc-300 rounded-lg text-left">
                  <p class="font-semibold text-xl text-zinc-900 dark:text-zinc-200">${language}</p>
                  <p class="text-sm/relaxed mt-1">Schule: ${school}<br>${schoolPublisher} Verlag<br>${wordCount} Wortlisten</p>
                  <p class="gap-2 mt-2 text-base font-semibold text-blue-500 dark:text-blue-400">Wortliste Aussuchen</p>
                </button>`;
    wlPanelDiv.insertAdjacentHTML("beforeend", html);
}
export function addWlBtn(unparsedLabel, wlLabel, wordCount) {
    const html = `<button id='wl-page__${unparsedLabel}' class="p-7 m-4 border-1 shadow-md hover:shadow-lg text-zinc-600 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-600 rounded-lg text-left">
                  <p class="font-semibold text-xl text-zinc-900 dark:text-zinc-200">${wlLabel.replace(/_/g, " ")}</p>
                  <p class="text-sm/relaxed mt-1 dark:text-zinc-300">${wordCount} Wörter</p>
                  <p class="gap-2 mt-2 text-base font-semibold text-blue-500 dark:text-blue-400">Übung starten</p>
                </button>`;
    wlPanelDiv.insertAdjacentHTML("beforeend", html);
}
export function hideWLSelection() {
    wlPanel.hidden = true;
}
export function showWLSelection() {
    wlPanel.hidden = false;
}
export function clearWlBtns() {
    wlPanelDiv.innerHTML = "";
}
