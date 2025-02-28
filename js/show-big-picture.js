import { isEscapeKey } from './utils.js';

const COMMENTS_PER_LOAD = 5;
let displayedCommentsCount = 0;
let allPhotoComments = [];

const photoPreviewElement = document.querySelector('.big-picture');
const photoPreviewImg = photoPreviewElement.querySelector('.big-picture__img img');
const photoLikesCount = photoPreviewElement.querySelector('.likes-count');
const shownCommentsCountElement = photoPreviewElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = photoPreviewElement.querySelector('.social__comment-total-count');
const commentsContainer = photoPreviewElement.querySelector('.social__comments');
const photoDescription = photoPreviewElement.querySelector('.social__caption');
const closePreviewButton = photoPreviewElement.querySelector('#picture-cancel');
const loadMoreCommentsButton = photoPreviewElement.querySelector('.social__comments-loader');

const closePhotoPreview = () => {
  photoPreviewElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscPressClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoPreview();
  }
};

const setPhotoClosingEvents = () => {
  closePreviewButton.addEventListener('click', closePhotoPreview, { once: true });
  document.addEventListener('keydown', onEscPressClose, { once: true });
};

const clearPhotoComments = () => {
  commentsContainer.innerHTML = '';
};

const populatePhotoData = ({ url, description, likes, comments }) => {
  photoPreviewImg.src = url;
  photoPreviewImg.alt = description;
  photoLikesCount.textContent = likes;
  totalCommentsCountElement.textContent = comments.length;
  allPhotoComments = comments;
  displayedCommentsCount = 0;
  shownCommentsCountElement.textContent = displayedCommentsCount;
  photoDescription.textContent = description;
};

const createCommentElement = ({ avatar, name, message }) => {
  const commentTemplate = document.querySelector('#data-comment').content.querySelector('.social__comment');
  const newComment = commentTemplate.cloneNode(true);

  const commentAvatar = newComment.querySelector('.social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;

  const commentText = newComment.querySelector('.social__text');
  commentText.textContent = message;

  return newComment;
};

const loadMoreComments = () => {
  const newComments = allPhotoComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_PER_LOAD);
  newComments.forEach((comment) => {
    commentsContainer.appendChild(createCommentElement(comment));
  });

  displayedCommentsCount += newComments.length;
  shownCommentsCountElement.textContent = displayedCommentsCount;

  loadMoreCommentsButton.classList.toggle('hidden', displayedCommentsCount >= allPhotoComments.length);
};

const openPhotoPreview = (photo) => {
  photoPreviewElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setPhotoClosingEvents();
  populatePhotoData(photo);
  clearPhotoComments();
  loadMoreComments();

  loadMoreCommentsButton.addEventListener('click', loadMoreComments);
};

export { openPhotoPreview };

