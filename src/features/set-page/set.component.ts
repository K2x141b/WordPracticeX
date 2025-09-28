import { toggleReverseBtn } from "./set.logic.js";
import { displayReverseBtn, hideSettingsPage } from "./set.ui.js";

displayReverseBtn(false);

document.getElementById("set-page__reverse-btn")?.addEventListener("click", () => {
  const state = toggleReverseBtn();
  displayReverseBtn(state);
});

hideSettingsPage();