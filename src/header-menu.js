
const hamburger = document.querySelector('.menu-hamburger');
const headerMenu = document.querySelector('.header-menu');
const showModificator = 'header-menu_show';
const hideModificator = 'header-menu_hide';
const closeModificator = 'menu-hamburger_close';
const animationDuration = 200;

function toggle() {
  const isShow = headerMenu.classList.contains(showModificator);
  if (isShow) {
    hide();
  } else {
    hamburger.classList.add(closeModificator);
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
  hamburger.classList.remove(closeModificator);
  headerMenu.classList.replace(showModificator, hideModificator);
  setTimeout(() => {
    headerMenu.classList.remove(hideModificator);
  }, animationDuration);
}

export default function initHeaderMenu() {
  hamburger.addEventListener('click', toggle);
  document.addEventListener('click', hide);
}