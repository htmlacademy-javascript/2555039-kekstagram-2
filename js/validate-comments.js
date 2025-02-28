const VALID_COMMENT_LENGTH = 140;

let commentErrorMessage = '';

const getCommentError = () => commentErrorMessage;

const isCommentValid = (value) => {
  commentErrorMessage = '';
  const trimmedText = value.trim();

  if (!trimmedText) {
    return true;
  }

  if (trimmedText.length > VALID_COMMENT_LENGTH) {
    commentErrorMessage = `Длина комментария не может превышать ${VALID_COMMENT_LENGTH} символов.`;
    return false;
  }

  return true;
};

export { getCommentError, isCommentValid };

