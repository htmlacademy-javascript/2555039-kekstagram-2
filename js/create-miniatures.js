/* Шаблон изображения случайного пользователя:
  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>
  */

  import { posts } from './create-posts-array';
  const pictureslist = document.querySelector('.pictures');
  const picturesItemTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const createdArray = posts;

  const picturesListFragment = document.createDocumentFragment();

  createdArray.forEach ((picture) => {
    const newPost = picturesItemTemplate.cloneNode(true);
    newPost.querySelector('.picture__img').src = picture.url;
    newPost.querySelector('.picture__img').alt = picture.description;
    newPost.querySelector('.picture__likes').textContent = picture.likes;
    newPost.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesListFragment.append (newPost);
  });

  pictureslist.append(picturesListFragment);
