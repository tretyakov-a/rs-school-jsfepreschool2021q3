
const hamburger = document.querySelector('.menu-hamburger');
const headerMenu = document.querySelector('.header-menu');
const showModificator = 'header-menu_show';
const hideModificator = 'header-menu_hide';
const humburgerCloseModificator = 'menu-hamburger_close';
const humburgerHideModificator = 'menu-hamburger_hide';
const animationDuration = 200;

function toggle() {
  const isShow = headerMenu.classList.contains(showModificator);
  if (isShow) {
    hide();
  } else {
    hamburger.classList.add(humburgerCloseModificator);
    headerMenu.classList.add(showModificator);
  }
}

function isClickOnHamburger(e) {
  return e.path.find(el => el.classList && el.classList.contains('menu-hamburger'));
}

function hide(e) {
  if (e && isClickOnHamburger(e)) {
    return;
  }
  hamburger.classList.replace(humburgerCloseModificator, humburgerHideModificator);
  headerMenu.classList.replace(showModificator, hideModificator);
  setTimeout(() => {
    headerMenu.classList.remove(hideModificator);
    hamburger.classList.remove(humburgerHideModificator);
  }, animationDuration);
}

export default function initHeaderMenu() {
  hamburger.addEventListener('click', toggle);
  document.addEventListener('click', hide);
}