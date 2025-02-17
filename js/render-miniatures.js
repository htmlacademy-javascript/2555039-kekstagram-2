import { showBigPicture } from './show-big-picture';

const renderMiniatures = (data) => {
  const picturesList = document.querySelector('.pictures');
  const picturesItemTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const picturesListFragment = document.createDocumentFragment();

  data.forEach ((picture) => {
    const newPostElement = picturesItemTemplate.cloneNode(true);
    const pictureImgElement = newPostElement.querySelector('.picture__img');

    pictureImgElement.src = picture.url;
    pictureImgElement.alt = picture.description;

    const pictureInfoElement = newPostElement.querySelector('.picture__info');
    pictureInfoElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureInfoElement.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesListFragment.append(newPostElement);

    newPostElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });
  });
  picturesList.append(picturesListFragment);
};


export { renderMiniatures };


