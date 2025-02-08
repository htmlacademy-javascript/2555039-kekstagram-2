import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const socialCommentsList = bigPictureElement.querySelector('.social__comments');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const commentCount = bigPictureElement.querySelector('.social__comment-count');
const socialCommentTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');

const COMMENTS_PER_PICTURE = 5;
let loadedComments = 0;
let allComments = [];

const loadComments = () => {
  const nextComments = allComments.slice(loadedComments, loadedComments + COMMENTS_PER_PICTURE);
  loadedComments += nextComments.length;
  nextComments.forEach((commentData) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${commentData.avatar}" alt="${commentData.name}" width="35" height="35">
      <p class="social__text">${commentData.message}</p>
    `;
    socialCommentsList.append(commentElement);
  });

  // Отображаем количество загруженных комментариев
  socialCommentShownCount.textContent = loadedComments;

  if(loadedComments >= allComments.length){
    commentsLoader.classList.add('hidden');
  }
};



const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  socialCommentTotalCount.textContent = picture.comments.length;

  // Сбрасываем загруженные комментарии перед новым открытием фото
  loadedComments = 0;
  allComments = picture.comments.slice();

  socialCommentsList.innerHTML = '';
  loadComments();

  if (allComments.length > loadedComments) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', loadComments);
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentCount.classList.remove('hidden');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeBigPicture, { once: true });
  document.addEventListener('keydown', onDocumentKeydown, { once: true });
};

export { showBigPicture };
