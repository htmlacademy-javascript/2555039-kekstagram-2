import { isEscapeKey } from './utils.js';
import { submitButtonTexts } from './posts-data.js';
import { initScale, setScaleReset } from './scale-setting.js';
import { resetEffects, initEffects } from './effects-setting.js';
import { pristine } from './pristine-config.js';
import { sendFormData } from './api.js';
import { displayErrorModal, displaySuccessModal, isErrorModalOpen } from './alerts.js';

const pageBody = document.querySelector('body');
const pictureUpload = document.querySelector('.img-upload');
const uploadFormElement = pictureUpload.querySelector('.img-upload__form');
const pictureUploadInput = pictureUpload.querySelector('.img-upload__input');
const overlayWrapper = pictureUpload.querySelector('.img-upload__overlay');
const picturePreview = pictureUpload.querySelector('.img-upload__preview img');
const effectsPreview = pictureUpload.querySelectorAll('.effects__preview');
const commentInput = pictureUpload.querySelector('.text__description');
const hashtagInput = pictureUpload.querySelector('.text__hashtags');
const closeFormButton = pictureUpload.querySelector('.img-upload__cancel');
const uploadSubmitElement = pictureUpload.querySelector('.img-upload__submit');

const isInputFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const onDataInputsKeydown = (evt) => {
  if (isEscapeKey(evt) && isInputFocused()) {
    evt.stopPropagation();
  }
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocused() && !isErrorModalOpen) {
    evt.preventDefault();
    closeForm();
  }
};

const toggleSubmitButton = (isBlocked) => {
  uploadSubmitElement.disabled = isBlocked;
  uploadSubmitElement.textContent = isBlocked ? submitButtonTexts.SENDING : submitButtonTexts.IDLE;
};

const removeEventListeners = () => {
  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagInput.removeEventListener('keydown', onDataInputsKeydown);
  commentInput.removeEventListener('keydown', onDataInputsKeydown);
  pictureUpload.removeEventListener('submit', onFormSubmit);
};

const addEventListeners = () => {
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscKeydown);
  hashtagInput.addEventListener('keydown', onDataInputsKeydown);
  commentInput.addEventListener('keydown', onDataInputsKeydown);
  pictureUpload.addEventListener('submit', onFormSubmit);
};

function closeForm() {
  pristine.reset();
  uploadFormElement.reset();
  pictureUploadInput.value = '';
  resetEffects();
  setScaleReset();
  overlayWrapper.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  removeEventListeners();
}

const onUploadInputChange = () => {
  picturePreview.src = '';
  const file = pictureUploadInput.files?.[0];

  if (!file) {
    return;
  }

  const imageURL = URL.createObjectURL(file);
  picturePreview.src = imageURL;
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageURL})`;
  });

  window.addEventListener(
    'load',
    () => {
      URL.revokeObjectURL(imageURL);
    },
    { once: true }
  );

  overlayWrapper.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  initScale();
  initEffects();
  addEventListeners();
};

async function onFormSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  toggleSubmitButton(true);
  const formData = new FormData(uploadFormElement);

  try {
    await sendFormData(formData);
    closeForm();
    displaySuccessModal();
  } catch {
    displayErrorModal();
  } finally {
    toggleSubmitButton(false);
  }
}

const initPictureUpload = () => {
  pictureUploadInput.addEventListener('change', onUploadInputChange);
};

export { initPictureUpload };
