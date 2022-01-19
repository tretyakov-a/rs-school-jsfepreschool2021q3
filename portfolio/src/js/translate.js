import vocabulary from './i18Obj';

let currentLanguage = 'en';
const languages = ['en', 'ru'];
const links = document.querySelectorAll('.language-switcher__link');
const activeModificator = 'language-switcher__link_active';

function handleTranslateLinkClick(e) {
  e.preventDefault();
  const language = e.target.dataset.language;
  if (language === currentLanguage) {
    return;
  }
  translate(language);
}

function setActiveLink(language) {
  for (const link of links) {
    link.classList.remove(activeModificator);
    if (link.dataset.language === language) {
      link.classList.add(activeModificator);
    }
  }
}

function translate(language) {
  const translatedElements = document.querySelectorAll('[data-translate]');
  currentLanguage = language;
  localStorage.setItem('language', currentLanguage);
  setActiveLink(language);
  for (const el of translatedElements) {
    const translationKey = el.dataset.translate;
    const translated = vocabulary[language][translationKey];
    if (['email', 'tel', 'textarea'].includes(el.type)) {
      el.placeholder = translated;
    } else {
      el.textContent = translated;
    }
  }
}

export default function init() {
  const language = localStorage.getItem('language');
  if (language &&
      currentLanguage !== language &&
      languages.includes(language)) {

    translate(language);
  }
  for (const link of links) {
    link.addEventListener('click', handleTranslateLinkClick);
  }
}
