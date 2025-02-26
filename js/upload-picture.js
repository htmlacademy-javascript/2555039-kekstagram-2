import { isEscapeKey } from './utils';
import { FILE_TYPES } from './posts-data.js';
import { initScale, scaleReset } from './scale-setting';
import { resetEffects, initEffects } from './effects-setting.js';

const pictureUpload = document.querySelector('.img-upload');
const pictureUploadInput = pictureUpload.querySelector('.img-upload__input');
const pictureUploadForm = pictureUpload.querySelector('.img-upload__form');
const overlayWrapper = pictureUpload.querySelector('.img-upload__overlay');
const picturePreview = pictureUpload.querySelector('.img-upload__preview img');
const resetButton = pictureUpload.querySelector('.img-upload__cancel');
const errorMessage = document.createElement('div');

errorMessage.classList.add('upload-error-message');
document.body.appendChild(errorMessage);

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
}

function closeForm() {
  overlayWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureUploadForm.reset();
  picturePreview.style.display = 'none';
  picturePreview.src = '';
  pictureUploadInput.value = '';
  scaleReset();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
}

resetButton.addEventListener('click', closeForm);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

pictureUploadInput.addEventListener('click', () => {
  pictureUploadInput.value = '';
});

const initPictureUpload = () => {
  pictureUploadInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];

    if (!file) return;

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();

    if (!FILE_TYPES.includes(fileExtension)) {
      showErrorMessage('Неверный формат файла! Допустимые форматы: JPG, JPEG, PNG, GIF.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      overlayWrapper.classList.remove('hidden');
      document.body.classList.add('modal-open');

      picturePreview.src = reader.result;
      picturePreview.style.display = 'block';
      initScale();
      initEffects();
      document.addEventListener('keydown', onDocumentKeydown);
    };

    reader.readAsDataURL(file);
  });
};

export { initPictureUpload, overlayWrapper, closeForm };
