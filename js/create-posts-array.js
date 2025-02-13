import { getDataPosts } from './posts-data.js';
import { getRandomInteger, getRandomIdFromRangeGenerator } from './utils.js';

const POST_ID_SET = { MIN: 1, MAX: 25 };
const PHOTO_ID_SET = { MIN: 1, MAX: 25 };
const COMMENT_ID_SET = { MIN: 1, MAX: 10000 };

const generateRandomPostId = getRandomIdFromRangeGenerator(POST_ID_SET.MIN, POST_ID_SET.MAX);
const generateRandomPhotoId = getRandomIdFromRangeGenerator(PHOTO_ID_SET.MIN, PHOTO_ID_SET.MAX);
const generateRandomCommentId = getRandomIdFromRangeGenerator(COMMENT_ID_SET.MIN, COMMENT_ID_SET.MAX);

const POSTS_ARRAY_LENGTH = 25;

const AVATARS_SET = { MIN: 1, MAX: 6 };
const LIKES_SET = { MIN: 15, MAX: 200 };
const COMMENTS_SET = { MIN: 0, MAX: 30};

const { DESCRIPTIONS, COMMENTS, NAMES } = getDataPosts();

const comment = () => {
  const avatarUrl = `img/avatar-${getRandomInteger(AVATARS_SET.MIN, AVATARS_SET.MAX)}.svg`;
  const randomCommentIndex = getRandomInteger(0, COMMENTS.length - 1);
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  return {
    id: generateRandomCommentId(),
    avatar: avatarUrl,
    message: COMMENTS[randomCommentIndex],
    name: NAMES[randomNameIndex],
  };
};

const createRandomPost = () => {
  const postId = generateRandomPostId();
  const photoId = generateRandomPhotoId();
  const photoUrl = `photos/${photoId}.jpg`;
  const likes = getRandomInteger(LIKES_SET.MIN, LIKES_SET.MAX);
  const commentsNumber = getRandomInteger(COMMENTS_SET.MIN, COMMENTS_SET.MAX);
  const commentsArray = Array.from({ length: commentsNumber }, comment);
  return {
    id: postId,
    url: photoUrl,
    description: DESCRIPTIONS[photoId - 1],
    likes: likes,
    comments: commentsArray,
  };
};

const posts = Array.from({ length: POSTS_ARRAY_LENGTH }, createRandomPost);
export {
  posts
};

export {
  createRandomPost, comment
};
