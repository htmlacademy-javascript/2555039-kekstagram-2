import { validateHashtagsInput, getValidationMessage } from './hashtag-validation.js';
import { getCommentError, isCommentValid } from './validate-comments.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(hashtagInput, validateHashtagsInput, getValidationMessage);
pristine.addValidator(commentInput, isCommentValid, getCommentError);

export { pristine, form };
