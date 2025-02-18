import { isEscapeKey } from "./utils";

const pictureUpload = document.querySelector('.img-upload');
const pictureUploadInput = pictureUpload.querySelector('.img-upload__input');
const pictureUploadForm = pictureUpload.querySelector('.img-upload__form');
const overlayWrapper = pictureUpload.querySelector('.img-upload__overlay');
const picturePreview = pictureUpload.querySelector('.img-upload__preview img');
const resetButton = pictureUpload.querySelector('.img-upload__cancel');

function closeForm() {
  overlayWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Сбрасываем значения всех полей формы
  pictureUploadForm.reset();
  picturePreview.style.display = 'none';
  picturePreview.src = '';
  pictureUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

resetButton.addEventListener('click', closeForm);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

// Для корректного сброса поля ввода файла, даже если загружен тот же файл
pictureUploadInput.addEventListener('click', () => {
  pictureUploadInput.value = '';
});

const initPictureUpload = () => {
  pictureUploadInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        overlayWrapper.classList.remove('hidden');
        document.body.classList.add('modal-open');

        picturePreview.src = reader.result;
        picturePreview.style.display = 'block'; // Показываем изображение

        document.addEventListener('keydown', onDocumentKeydown);
      };

      reader.readAsDataURL(file);
    }
  });
};

export { initPictureUpload, overlayWrapper };
