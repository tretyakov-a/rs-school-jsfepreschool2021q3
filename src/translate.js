let currentLanguage = 'en';
const languages = ['en', 'ru'];
const links = document.querySelectorAll('.language-switcher__link');
const translatedElements = document.querySelectorAll('[data-translate]');
const activeModificator = 'language-switcher__link_active';

function handleTranslateLinkClick(e) {
  e.preventDefault();
  const language = e.target.dataset.language;
  if (language === currentLanguage) {
    return;
  }
  currentLanguage = language;
  localStorage.setItem('language', currentLanguage);
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
  setActiveLink(language);
  for (const el of translatedElements) {
    const translationKey = el.dataset.translate;
    el.textContent = i18Obj[language][translationKey];
  }
}

export default function init() {
  const language = localStorage.getItem('language');
  if (language !== undefined && languages.includes(language)) {
    currentLanguage = language;
  }
  translate(currentLanguage);
  for (const link of links) {
    link.addEventListener('click', handleTranslateLinkClick);
  }
}

const i18Obj = {
  'en': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-descripton-1-span-1': 'One location',
    'price-descripton-1-span-2': '120 photos in color',
    'price-descripton-1-span-3': '12 photos in retouch',
    'price-descripton-1-span-4': 'Readiness 2-3 weeks',
    'price-descripton-1-span-5': 'Make up, visage',
    'price-descripton-2-span-1': 'One or two locations',
    'price-descripton-2-span-2': '200 photos in color',
    'price-descripton-2-span-3': '20 photos in retouch',
    'price-descripton-2-span-4': 'Readiness 1-2 weeks',
    'price-descripton-2-span-5': 'Make up, visage',
    'price-descripton-3-span-1': 'Tree locations or more',
    'price-descripton-3-span-2': '300 photos in color',
    'price-descripton-3-span-3': '50 photos in retouch',
    'price-descripton-3-span-4': 'Readiness 1 weeks',
    'price-descripton-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact with me',
    'send-message': 'Send message'
  },
  'ru' : {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-descripton-1-span-1': 'Одна локация',
    'price-descripton-1-span-2': '120 цветных фото',
    'price-descripton-1-span-3': '12 отретушированных фото',
    'price-descripton-1-span-4': 'Готовность через 2-3 недели',
    'price-descripton-1-span-5': 'Макияж, визаж',
    'price-descripton-2-span-1': 'Одна-две локации',
    'price-descripton-2-span-2': '200 цветных фото',
    'price-descripton-2-span-3': '20 отретушированных фото',
    'price-descripton-2-span-4': 'Готовность через 1-2 недели',
    'price-descripton-2-span-5': 'Макияж, визаж',
    'price-descripton-3-span-1': 'Три локации и больше',
    'price-descripton-3-span-2': '300 цветных фото',
    'price-descripton-3-span-3': '50 отретушированных фото',
    'price-descripton-3-span-4': 'Готовность через 1 неделю',
    'price-descripton-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'send-message': 'Отправить'
  }
}