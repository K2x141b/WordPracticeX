import { hideSettingsPage, showSettingsPage } from "../set-page/set.ui.js";
import { hideWLSelection, showWLSelection } from "../wl-page/wl.ui.js";
import { hidePracticePage } from "../prac-page/prac.ui.js";
import { displayLangs } from "../wl-page/wl.component.js";

const wlBtn = document.getElementById("menu__wl-btn")!;
const setBtn = document.getElementById("menu__set-btn")!;

wlBtn.addEventListener("click", () => {
  hideSettingsPage();
  showWLSelection();
  hidePracticePage();
  displayLangs();
});

setBtn.addEventListener("click", () => {
  showSettingsPage();
  hideWLSelection();
  hidePracticePage();
});
