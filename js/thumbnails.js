import { createPhotos } from './data.js';

const userPhotosContainer = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photosListFragment = document.createDocumentFragment();

const photos = createPhotos(3);
photos.forEach(({url, comments, likes}) => {
  const userPhoto = userPhotoTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__img').src = url;
  userPhoto.querySelector('.picture__comments').textContent = comments.length;
  userPhoto.querySelector('.picture__likes').textContent = likes;

  photosListFragment.append(userPhoto);
});

userPhotosContainer.append(photosListFragment);
