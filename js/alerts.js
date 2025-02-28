import { isEscapeKey } from './utils.js';
import { ALERT_SHOW_TIME } from './posts-data.js';

let isErrorModalOpen = false;

const templates = {
  error: document.querySelector('#error').content,
  success: document.querySelector('#success').content,
  dataError: document.querySelector('#data-error').content
};

const modalContainer = document.createElement('div');
document.body.append(modalContainer);

const openModal = (type) => {
  const template = templates[type].cloneNode(true);
  const modalElement = template.querySelector('section');
  modalContainer.append(modalElement);
  isErrorModalOpen = true;

  const closeModal = () => {
    modalElement.remove();
    isErrorModalOpen = false;
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscPress(evt) {
    if (isEscapeKey(evt) && isErrorModalOpen) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest('.error__inner') && !evt.target.closest('.success__inner')) {
      closeModal();
    }
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);

  const closeButton = modalElement.querySelector('.error__button') || modalElement.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
};

const displayErrorModal = () => {
  openModal('error');
};

const showDataLoadError = () => {
  const template = templates.dataError.cloneNode(true);
  const container = template.querySelector('.data-error');
  modalContainer.append(container);

  setTimeout(() => {
    container.remove();
  }, ALERT_SHOW_TIME);
};

const displaySuccessModal = () => {
  openModal('success');
};

export { displayErrorModal, displaySuccessModal, showDataLoadError, isErrorModalOpen };
