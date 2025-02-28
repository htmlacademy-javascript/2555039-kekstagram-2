import { renderMiniatures } from './render-miniatures.js';
import { initPictureUpload } from './upload-picture.js';
import { getData } from './api.js';
import { showDataLoadError } from './show-alerts.js';
import { initFilters } from './posts-filter.js';
import { debounce } from './utils.js';

const initApp = async () => {
  initPictureUpload();

  try {
    const data = await getData();
    const container = document.querySelector('.pictures');
    const uploadForm = container.querySelector('.img-upload');

    const debouncedRender = debounce((filteredPhotos) => {
      updateContainerWithPhotos(container, uploadForm, filteredPhotos);
    });

    initFilters(data, debouncedRender);
    renderMiniatures(container, data);

  } catch (error) {
    showDataLoadError();
  }
};

const updateContainerWithPhotos = (container, uploadForm, filteredPhotos) => {
  container.innerHTML = '';
  if (uploadForm) {
    container.append(uploadForm);
  }
  renderMiniatures(container, filteredPhotos);
};

initApp();

