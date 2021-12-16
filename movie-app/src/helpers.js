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