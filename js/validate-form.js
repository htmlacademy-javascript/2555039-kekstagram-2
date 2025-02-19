import { sendFormData } from './form-handler.js';

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const closeButton = document.querySelector('#upload-cancel');

const VALID_HASHTAGS_LENGTH = 5;
const VALID_COMMENT_LENGTH = 140;
let errorMessage = '';
const error = () => errorMessage;

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

// Валидация хэштегов
const validateHashtags = (value) => {
  errorMessage = '';
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set(hashtags);

  // Проверка количества хэштегов
  if (uniqueHashtags.size > VALID_HASHTAGS_LENGTH) {
    errorMessage = 'Нельзя вводить больше 5 хэштегов!';
    return false;
  }

  // Проверка на повторяющиеся хэштеги
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage = 'Хэштеги не могут повторяться!';
    return false;
  }

  // Проверка каждого хэштега по регулярному выражению
  for (const tag of hashtags) {
    if (!hashtagRegex.test(tag)) {
      errorMessage = `Некорректный хэштег: ${tag}`;
      return false;
    }
  }
  return true;
};

pristine.addValidator(hashtagInput, validateHashtags, error);

// Валидация комментария
const validateComment = (value) => value.length <= VALID_COMMENT_LENGTH;
pristine.addValidator(commentInput, validateComment, 'Комментарий не должен превышать 140 символов');

const closeUploadForm = () => {
  form.reset();
  pristine.reset();
  fileInput.value = '';
};

// Закрытие формы по кнопке "крестик"
closeButton.addEventListener('click', () => {
  closeUploadForm();
});

const initUploadForm = () => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      await sendFormData(new FormData(form));
    }
  });
};

export { closeUploadForm, form, initUploadForm };
