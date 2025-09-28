const setDiv = document.getElementById("set-page")!;
const reverseBtn = document.getElementById("set-page__reverse-btn")!;
const shuffleListBtn = document.getElementById("set-page__shuffle-list-btn")!;

export function hideSettingsPage() {
  setDiv.hidden = true;
}

export function showSettingsPage() {
  setDiv.hidden = false;
}

export function displayReverseBtn(state: boolean) {
  if (state === true) {
    reverseBtn.innerText = "reversed";
    return;
  }
  reverseBtn.innerText = "not reversed";
}

export function displayShuffleListBtn(state: boolean) {
  if (state === true) {
    shuffleListBtn.innerText = "Shuffle lists";
    return;
  }
  shuffleListBtn.innerText = "don't Shuffle Lists";
}