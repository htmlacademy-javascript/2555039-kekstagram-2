import { Filters, RANDOM_PHOTO_MAX } from './posts-data.js';
import { shuffleArray } from './utils.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const filtersFormElement = imgFiltersContainer.querySelector('.img-filters__form');
const filtersButtons = filtersFormElement.querySelectorAll('.img-filters__button');

// Функция фильтрации фотографий
const applyFilter = (photos, filterType) => {
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

// Инициализация фильтров
const initFilters = (photos, renderThumbnails) => {
  imgFiltersContainer.classList.remove('img-filters--inactive');

  filtersFormElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    filtersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');

    const selectedFilter = evt.target.id;
    const filtered = applyFilter(photos, selectedFilter);

    renderThumbnails(filtered);
  });
};

export { initFilters };
