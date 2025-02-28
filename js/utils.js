import { DEBOUNCE_TIME } from './posts-data.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = new Set();

  return function () {
    if (previousValues.size >= (max - min + 1)) {
      return `Все числа из диапазона ${min}-${max} уже использованы`;
    }

    let currentValue;
    do {
      currentValue = getRandomInteger(min, max);
    } while (previousValues.has(currentValue));

    previousValues.add(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffleArray = (arrays) => {
  for (let i = arrays.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrays[i], arrays[randomIndex]] = [arrays[randomIndex], arrays[i]];
  }
  return arrays;
};

const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomIdFromRangeGenerator,
  isEscapeKey,
  shuffleArray,
  debounce
};
