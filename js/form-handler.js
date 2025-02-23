import { closeUploadForm } from './validate-form.js';
import { isEscapeKey } from './utils.js';

const submitButton = document.querySelector('#upload-submit');

// Функция показа успешного сообщения
function showSuccessMessage() {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successTemplate);

  const successMessage = document.querySelector('.success');
  document.addEventListener('keydown', onSuccessMessageKeydown);

  successMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);

  successMessage.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      closeSuccessMessage();
    }
  });
}

// Функция закрытия успешного сообщения
function closeSuccessMessage() {
  const successMessage = document.querySelector('.success');
  if (successMessage) {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
    closeUploadForm(); // Закрываем и сбрасываем форму
  }
}

// Обработчик нажатия Escape для успешного сообщения
function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

// Функция показа сообщения об ошибке
function showErrorMessage() {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);

  const errorMessage = document.querySelector('.error');
  document.addEventListener('keydown', onErrorMessageKeydown);

  errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);

  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      closeErrorMessage();
    }
  });
}

// Функция закрытия сообщения об ошибке
function closeErrorMessage() {
  const errorMessage = document.querySelector('.error');
  if (errorMessage) {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageKeydown);
  }
}

// Обработчик нажатия Escape для сообщения об ошибке
function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

async function sendFormData(formData) {
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
    closeUploadForm(); // Сбрасываем форму после успешной отправки
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
}

export { sendFormData };
