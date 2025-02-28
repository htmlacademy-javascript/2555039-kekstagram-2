import { openPhotoPreview } from './show-big-picture.js';

const renderMiniatures = (container, photos) => {
  const miniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const miniaturesElement = miniaturesTemplate.cloneNode(true);

    const miniaturesImage = miniaturesElement.querySelector('.picture__img');
    miniaturesImage.src = url;
    miniaturesImage.alt = description;
    const miniaturesInfo = miniaturesElement.querySelector('.picture__info');
    miniaturesInfo.querySelector('.picture__likes').textContent = likes;
    miniaturesInfo.querySelector('.picture__comments').textContent = comments.length;

    miniaturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhotoPreview({ url, description, likes, comments });
    });

    fragment.append(miniaturesElement);
  });

  container.append(fragment);
};

export { renderMiniatures };


