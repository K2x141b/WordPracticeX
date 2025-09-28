const wlPanel = document.getElementById("wl-page")!;

export function addLangBtn(unparsedLabel: string, label: string, company: string, level: string, length: string) {
  const html = `<button id='wl-page__${unparsedLabel}'>${label}
                <p>${level}</p>
                <p>${length} Übungen</p>
                <p>${company}</p>
                </button>`;
  wlPanel.insertAdjacentHTML("beforeend", html);
}

export function addWlBtn(unparsedLabel: string, wlLabel: string, wordCount: string) {
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
