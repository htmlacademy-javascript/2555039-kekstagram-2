const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

let validationMessage = '';

const getValidationMessage = () => validationMessage;

const validateHashtagsInput = (input) => {
  validationMessage = '';
  const cleanedInput = input.toLowerCase().trim();

  if (cleanedInput.length === 0) {
    return true;
  }

  const hashtagsArray = cleanedInput.split(/\s+/);
  const uniqueHashtags = new Set();

  if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
    validationMessage = `Допустимо не более ${MAX_HASHTAG_COUNT} хештегов`;
    return false;
  }

  for (const hashtag of hashtagsArray) {
    if (!isValidHashtag(hashtag, uniqueHashtags)) {
      return false;
    }
    uniqueHashtags.add(hashtag);
  }

  return true;
};

const isValidHashtag = (hashtag, uniqueHashtags) => {
  if (hashtag === '#') {
    validationMessage = 'Хештег не может состоять только из одной решётки';
    return false;
  }

  if (hashtag.includes('#', 1)) {
    validationMessage = 'Хештеги нужно разделять пробелами';
    return false;
  }

  if (!hashtag.startsWith('#')) {
    validationMessage = 'Хештег должен начинаться с символа "#"';
    return false;
  }

  if (uniqueHashtags.has(hashtag)) {
    validationMessage = 'Хештеги не должны повторяться';
    return false;
  }

  if (hashtag.length > MAX_HASHTAG_LENGTH) {
    validationMessage = `Максимальная длина хештега — ${MAX_HASHTAG_LENGTH} символов`;
    return false;
  }

  if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
    validationMessage = 'Хештег содержит недопустимые символы';
    return false;
  }

  return true;
};

export { getValidationMessage, validateHashtagsInput };

