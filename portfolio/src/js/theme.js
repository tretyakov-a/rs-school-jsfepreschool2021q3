
const link = document.querySelector('.theme-switcher');
const darkIcon = document.querySelector('.theme-switcher__icon[data-theme="dark"]');
const lightIcon = document.querySelector('.theme-switcher__icon[data-theme="light"]');
const root = document.querySelector(':root');
const hideModificator = 'theme-switcher__icon_hide';
const showModificator = 'theme-switcher__icon_show';
const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
}
let currentTheme = THEMES.DARK;
let isChangeInProcess = false;
const animationDuration = 400;

function handleThemeSwitcherClick(e) {
  currentTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  changeTheme(currentTheme);
}

function changeTheme(theme) {
  if (isChangeInProcess) {
    return;
  }
  isChangeInProcess = true;
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  const isDarkTheme = currentTheme === THEMES.DARK;
  const prevTheme = isDarkTheme ? THEMES.LIGHT : THEMES.DARK;

  root.classList.remove(prevTheme);
  root.classList.add(currentTheme);

  lightIcon.classList.remove(hideModificator, showModificator);
  darkIcon.classList.remove(hideModificator, showModificator);

  if (isDarkTheme) {
    darkIcon.classList.add(showModificator);
    lightIcon.classList.add(hideModificator);
  } else {
    darkIcon.classList.add(hideModificator);
    lightIcon.classList.add(showModificator);
  }

  setTimeout(() => {
    isChangeInProcess = false;
  }, animationDuration);
}

export default function init() {
  const theme = localStorage.getItem('theme');
  if (theme && theme !== currentTheme) {
    changeTheme(theme);
  }

  link.addEventListener('click', handleThemeSwitcherClick);
  link.addEventListener('mousedown', e => e.preventDefault());
}