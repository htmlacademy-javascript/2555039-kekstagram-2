import { isEscapeKey } from './utils.js';
import { ALERT_SHOW_TIME } from './posts-data.js';

let isErrorModalOpen = false;

const openModal = (templateId) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const modalContainer = template.querySelector('section');
  document.body.append(modalContainer);
  isErrorModalOpen = true;

  const closeModal = () => {
    modalContainer.remove();
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

  const closeButton = modalContainer.querySelector('.error__button') || modalContainer.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  };
};

const displayErrorModal = () => {
  openModal('#error');
}

const showDataLoadError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const container = template.querySelector('.data-error');
  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, ALERT_SHOW_TIME);
};

const displaySuccessModal = () => {
  openModal('#success');
};


export { displayErrorModal, displaySuccessModal, showDataLoadError, isErrorModalOpen };

