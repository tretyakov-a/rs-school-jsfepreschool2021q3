
const hamburger = document.querySelector('.menu-hamburger');
const headerMenu = document.querySelector('.header-menu');
const headerNav = document.querySelector('.header__nav');
const headerNavShowModificator = 'header__nav_show';
const hideModificator = 'header-menu_hide';
const humburgerHideModificator = 'menu-hamburger_hide';
const animationDuration = 200;

function handleDocumentClick(e) {
  const isShowed = headerNav.classList.contains(headerNavShowModificator);
  const isClickOnCloseBtn = e.target.closest('.menu-hamburger');
  const isClickOutsideMenu = !e.path.find(el => el.classList && el.classList.contains('header-menu'));
  const isClickOnLink = e.path.find(el => el.classList && el.classList.contains('header-menu__item-link'));
  
  if (isClickOnCloseBtn && !isShowed) {
    headerNav.classList.add(headerNavShowModificator);
  }

  if (isShowed && (isClickOutsideMenu || isClickOnLink)) {
    hide();
  }
}

function hide() {
  headerNav.classList.remove(headerNavShowModificator);
  hamburger.classList.add(humburgerHideModificator);
  headerMenu.classList.add(hideModificator);

  setTimeout(() => {
    headerMenu.classList.remove(hideModificator);
    hamburger.classList.remove(humburgerHideModificator);
  }, animationDuration);
}

export default function initHeaderMenu() {
  // hamburger.addEventListener('click', toggle);
  document.addEventListener('click', handleDocumentClick);
}