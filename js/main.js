import { posts } from './create-posts-array.js';
import { renderMiniatures } from './render-miniatures.js';
import './upload-picture.js';
import './validate-form.js';

const createdArray = posts;
renderMiniatures(createdArray);
