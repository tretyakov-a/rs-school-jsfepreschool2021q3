
const buttonsContainer = document.querySelector('.portfolio__buttons-group');
const buttons = buttonsContainer.querySelectorAll('.button');
const works = document.querySelectorAll('.portfolio__works');
const btnActiveModificator = 'button_active';
const portfolioActiveModificator = 'portfolio__works_active';

let activeFolder = 'autumn';

function handleButtonClick(e) {
  const btn = e.target.closest('.button');
  if (!btn || btn.dataset.folder === activeFolder) {
    return;
  }
  
  activeFolder = btn.dataset.folder;

  for (const btn of buttons) {
    btn.classList.remove(btnActiveModificator);
  }
  btn.classList.add(btnActiveModificator);

  for (const work of works) {
    work.classList.remove(portfolioActiveModificator);
    if (work.dataset.folder === activeFolder) {
      work.classList.add(portfolioActiveModificator);
    }
  }
}

export default function init() {
  buttonsContainer.addEventListener('click', handleButtonClick);
}