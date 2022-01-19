
const link = document.querySelector('.theme-switcher');
const darkIcon = document.querySelector('.theme-switcher__icon[data-theme="dark"]');
const lightIcon = document.querySelector('.theme-switcher__icon[data-theme="light"]');
const root = document.querySelector(':root');
const hideModificator = 'theme-switcher__icon_hide';
const showModificator = 'theme-switcher__icon_show';
let currentTheme = 'dark';

function handleThemeSwitcherClick(e) {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  changeTheme(currentTheme);
}

function changeTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  const isDarkTheme = currentTheme === 'dark';
  const prevTheme = isDarkTheme ? 'light' : 'dark';

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
}

export default function init() {
  const theme = localStorage.getItem('theme');
  if (theme && theme !== currentTheme) {
    changeTheme(theme);
  }

  link.addEventListener('click', handleThemeSwitcherClick);
  link.addEventListener('mousedown', e => e.preventDefault());
}