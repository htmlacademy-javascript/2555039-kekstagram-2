const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const validateHashtags = (value) => {
  if (!value.trim()) return true;
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > 5) return false;
  return hashtags.every(tag => hashtagRegex.test(tag));
};

pristine.addValidator(hashtagInput, validateHashtags, 'Некорректные хэштеги!');

const validateComment = (value) => value.length <= 140;
pristine.addValidator(commentInput, validateComment, 'Комментарий не должен превышать 140 символов');

// Перехват отправки формы
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    await sendFormData(new FormData(form));
  }
});

const sendFormData = async (formData) => {
  try {
    submitButton.disabled = true; // Блокируем кнопку на время отправки

    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }

    showSuccessMessage();
    form.reset();
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

// Функции показа сообщений
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successTemplate);

  // Обработчик закрытия сообщения
  const successMessage = document.querySelector('.success');
  successMessage.querySelector('.success__button').addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });

  // Закрытие по клику вне сообщения
  successMessage.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);

  // Обработчик закрытия сообщения
  const errorMessage = document.querySelector('.error');
  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    errorMessage.remove();
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });

  // Закрытие по клику вне сообщения
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }
  });
};

// Закрытие формы и сброс полей
const closeButton = document.querySelector('#upload-cancel');
closeButton.addEventListener('click', () => {
  form.reset();
  pristine.reset();
  fileInput.value = '';
});
