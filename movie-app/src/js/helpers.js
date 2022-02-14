export const debounce = (ms, fn) => {
  let timer = null;
  function wrapper(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  }
  return wrapper;
}

export function isClickOutside(e, element) {
  return e && !e.path.find(el => el.classList && el.classList.contains(element));
}