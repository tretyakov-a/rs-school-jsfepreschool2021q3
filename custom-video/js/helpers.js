// doesnt work with objects methods
const throttle = (ms, fn) => {
  let cooldown = false;
  let savedArgs = null;

  function wrapper(...args) {
    if (cooldown) {
      savedArgs = args;
      return;
    }
    cooldown = true;
    setTimeout(() => {
      fn.apply(null, args);
      cooldown = false;
      if (savedArgs) {
        wrapper.apply(null, savedArgs);
        savedArgs = null;
      }
    }, ms);
  }
  return wrapper;
};

const throttlingDelay = 50;
const throttleDelayed = fn => throttle.call(null, throttlingDelay, fn);

function timeToText(time) {
  time = Math.trunc(time);
  const seconds = time % 60;
  const minutes = Math.trunc(time / 60) % 60;
  const hours = Math.trunc(time / 60 / 60);
  const hoursLabel = hours ? `${hours}:` : '';
  return `${hoursLabel}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function isElementClicked(event, className) {
  const classes = Array.isArray(className) ? className : [className];
  return event && event.path.find(pathEl => {
    return pathEl.classList && classes.find(el => pathEl.classList.contains(el));
  });
}