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

    let currentValue = getRandomInteger(min, max);
    while (previousValues.has(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.add(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomIdFromRangeGenerator,
  isEscapeKey
};
