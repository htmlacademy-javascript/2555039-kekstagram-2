const POST_ID_SET = {
  MIN: 1,
  MAX: 25,
};

const PHOTO_ID_SET = {
  MIN: 1,
  MAX: 25,
};

const COMMENT_ID_SET = {
  MIN: 1,
  MAX: 10000,
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateRandomPostId = getRandomIdFromRangeGenerator(POST_ID_SET.MIN, POST_ID_SET.MAX);
const generateRandomPhotoId = getRandomIdFromRangeGenerator(PHOTO_ID_SET.MIN, PHOTO_ID_SET.MAX);
const generateRandomCommentId = getRandomIdFromRangeGenerator(COMMENT_ID_SET.MIN, COMMENT_ID_SET.MAX);

export {
  getRandomInteger,
  generateRandomPostId,
  generateRandomPhotoId,
  generateRandomCommentId
};
