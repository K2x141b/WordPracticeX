import { hideSettingsPage, showSettingsPage } from "../set-page/set.ui.js";
import { hideWLSelection, showWLSelection } from "../wl-page/wl.ui.js";
import { hidePracticePage } from "../prac-page/prac.ui.js";
import { displayLangs } from "../wl-page/wl.component.js";

const wlBtn = document.getElementById("menu__wl-btn")!;
const setBtn = document.getElementById("menu__set-btn")!;

const lightDarkMode = document.getElementById("menu__dark-btn")!;
const sunIcon = document.getElementById("menu__sun-icon")!;
const moonIcon = document.getElementById("menu__moon-icon")!;

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

lightDarkMode.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  moonIcon.classList.toggle("hidden");
  sunIcon.classList.toggle("hidden");
});