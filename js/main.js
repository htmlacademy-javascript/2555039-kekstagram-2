import { posts } from './create-posts-array.js';
import { renderMiniatures } from './render-miniatures.js';
import { initUploadForm } from './validate-form.js';
import { initPictureUpload } from './upload-picture.js';

const createdArray = posts;
renderMiniatures(createdArray);
initUploadForm();
initPictureUpload();

