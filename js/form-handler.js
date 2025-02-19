import { closeUploadForm } from './validate-form.js';
import { isEscapeKey } from './utils.js';

const submitButton = document.querySelector('#upload-submit');

// Функция показа успешного сообщения
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successTemplate);

  const successMessage = document.querySelector('.success');

  const closeSuccessMessage = () => {
    successMessage.remove();
    closeUploadForm(); // Закрываем форму
  };

  successMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  });

  successMessage.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      closeSuccessMessage();
    }
  });
};

// Функция показа сообщения об ошибке
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);

  const errorMessage = document.querySelector('.error');

  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    errorMessage.remove();
  });

  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }
  });
};

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
    closeUploadForm(); // Закрываем форму после успешной отправки
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

// Отправка данных формы
export { sendFormData };
