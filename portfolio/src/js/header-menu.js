
const headerNav = document.querySelector('.header__nav');
const headerNavShowModificator = 'header__nav_show';
const headerNavHideModificator = 'header__nav_hide';
const animationDuration = 400;

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
  headerNav.classList.add(headerNavHideModificator);

  setTimeout(() => {
    headerNav.classList.remove(headerNavHideModificator);
  }, animationDuration);
}

export default function initHeaderMenu() {
  document.addEventListener('click', handleDocumentClick);
}