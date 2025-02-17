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

const createCommentElement = (commentData) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = commentData.avatar;
  img.alt = commentData.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentData.message;

  commentElement.append(img, text);
  return commentElement;
};

const loadComments = () => {
  const nextComments = allComments.slice(loadedComments, loadedComments + COMMENTS_PER_PICTURE);
  loadedComments += nextComments.length;

  const fragment = document.createDocumentFragment();
  nextComments.forEach((commentData) => {
    fragment.append(createCommentElement(commentData));
  });
  socialCommentsList.append(fragment);

  socialCommentShownCount.textContent = loadedComments;
  if (loadedComments >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const registerEvents = () => {
  closeButton.addEventListener('click', closeBigPicture, { once: true });
  document.addEventListener('keydown', onDocumentKeydown, { once: true });
};

const addedDataBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  socialCommentTotalCount.textContent = picture.comments ? picture.comments.length : 0;
};

const resetComments = (picture) => {
  loadedComments = 0;
  allComments = picture.comments ? picture.comments.slice() : [];
  socialCommentsList.innerHTML = '';
};

const showBigPicture = (picture) => {
  addedDataBigPicture(picture);
  resetComments(picture);
  loadComments();
  commentsLoader.removeEventListener('click', loadComments);

  if (allComments.length > loadedComments) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', loadComments);
  } else {
    commentsLoader.classList.add('hidden');
  }
  commentCount.classList.remove('hidden');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  registerEvents(closeButton, bigPictureElement);
};

export { showBigPicture, registerEvents };
