
const link = document.querySelector('.theme-switcher__link');
const root = document.querySelector(':root');
let currentTheme = 'dark';

function handleThemeSwitcherClick(e) {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  changeTheme(currentTheme);
}

function changeTheme(theme) {
  console.log('changeTheme to', theme)
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  const prevTheme = currentTheme === 'dark' ? 'light' : 'dark';

  root.classList.remove(prevTheme);
  root.classList.add(currentTheme);

  link.classList.remove(`theme-switcher__link_${prevTheme}`);
  link.classList.add(`theme-switcher__link_${currentTheme}`);
}

export default function init() {
  const theme = localStorage.getItem('theme');
  if (theme && theme !== currentTheme) {
    changeTheme(theme);
  }

  link.addEventListener('click', handleThemeSwitcherClick);
}