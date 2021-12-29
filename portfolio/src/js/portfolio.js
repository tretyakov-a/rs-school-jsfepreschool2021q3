
const buttonsContainer = document.querySelector('.portfolio__buttons-group');
const buttons = buttonsContainer.querySelectorAll('.button');
const works = document.querySelectorAll('.portfolio__works');
const btnActiveModificator = 'button_filled';
const portfolioActiveModificator = 'portfolio__works_active';

function handleButtonClick(e) {
  const btn = e.target.closest('.button');
  const folder = btn.dataset.folder;
  for (const btn of buttons) {
    btn.classList.remove(btnActiveModificator);
  }
  btn.classList.add(btnActiveModificator);

  for (const work of works) {
    work.classList.remove(portfolioActiveModificator);
    if (work.dataset.folder === folder) {
      work.classList.add(portfolioActiveModificator);
    }
  }
}

export default function init() {
  buttonsContainer.addEventListener('click', handleButtonClick);
}