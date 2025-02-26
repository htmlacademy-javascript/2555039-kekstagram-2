import { Filters, RANDOM_PHOTO_MAX, DEBOUNCE_TIME } from './posts-data.js';
import { shuffleArray, debounce } from './utils.js';
import { renderMiniatures } from './render-miniatures.js';

const filterPhotos = (photos, filterType) => {
  switch (filterType) {
    case Filters.DEFAULT:
      return [...photos];

    case Filters.RANDOM:
      return shuffleArray([...photos]).slice(0, RANDOM_PHOTO_MAX);

    case Filters.DISCUSSED:
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);

    default:
      return [...photos];
  }
};

const initPhotoFilter = (photos) => {
  const filtersContainer = document.querySelector('.img-filters');
  const filtersFormElement = filtersContainer.querySelector('.img-filters__form');
  const filtersButtons = filtersFormElement.querySelectorAll('.img-filters__button');

  filtersContainer.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filteredPhotos) => {
    updatePhotoFeed(filteredPhotos);
  }, DEBOUNCE_TIME);

  filtersFormElement.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    filtersButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');

    const filterType = button.id;
    const filteredPhotos = filterPhotos(photos, filterType);

    debouncedRender(filteredPhotos);
  });
};

// Функция обновления миниатюр
function updatePhotoFeed(photos) {
  const photoContainer = document.querySelector('.pictures');

  // Удаляем старые миниатюры перед рендерингом новых
  photoContainer.querySelectorAll('.picture').forEach((miniature) => miniature.remove());

  // Отрисовываем новые миниатюры
  renderMiniatures(photos);
}

export { initPhotoFilter, updatePhotoFeed };
