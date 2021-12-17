
const buttonsContainer = document.querySelector('.portfolio__buttons-group');
const buttons = buttonsContainer.querySelectorAll('.button');
const works = document.querySelectorAll('.portfolio__works');

function handleButtonClick(e) {
  const btn = e.target.closest('.button');
  const folder = btn.dataset.folder;
  for (const btn of buttons) {
    btn.classList.remove('button_filled');
  }
  btn.classList.add('button_filled');

  for (const work of works) {
    work.classList.remove('portfolio__works_active');
    if (work.dataset.folder === folder) {
      work.classList.add('portfolio__works_active');
    }
  }
}

export default function init() {
  buttonsContainer.addEventListener('click', handleButtonClick);
}