import { closeUploadForm } from './validate-form.js';
import { isEscapeKey } from './utils.js';

const submitButton = document.querySelector('#upload-submit');

// Функция показа успешного сообщения
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successTemplate);

  const successMessage = document.querySelector('.success');

  const closeSuccessMessage = () => {
    document.removeEventListener('keydown', onSuccessMessageKeydown);
    successMessage.remove();
    closeUploadForm(); // Закрываем и сбрасываем форму
  };

  const onSuccessMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  };

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);

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

  const closeErrorMessage = () => {
    document.removeEventListener('keydown', onErrorMessageKeydown); // Удаляем обработчик перед удалением
    errorMessage.remove();
  };

  const onErrorMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
    }
  };

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);

  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      closeErrorMessage();
    }
  });
};

// Функция отправки данных
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
    closeUploadForm(); // сброс формы после успешной отправки
  } catch (error) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

// Отправка данных формы
export { sendFormData };
