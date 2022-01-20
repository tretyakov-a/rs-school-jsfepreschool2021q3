

const animationDuration = 400;

function handleButtonClick(e) {
  if (e.target.classList.contains('circle')) {
    return;
  }
  const circle = document.createElement('span');
  circle.classList.add('circle');
  circle.style.top = e.layerY + 'px';
  circle.style.left = e.layerX + 'px';

  e.target.appendChild(circle);

  setTimeout(() => circle.remove(), animationDuration);
}

export default function init() {
  const buttons = document.querySelectorAll('.button_ripple');
  for (const btn of buttons) {
    btn.addEventListener('click', handleButtonClick);
  }
}
