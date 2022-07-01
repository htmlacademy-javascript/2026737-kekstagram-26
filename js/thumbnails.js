import { createPhotos } from './data.js';

const userPhotosContainer = document.querySelector('.pictures');//вставляем сюда
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');//шаблон

const photosListFragment = document.createDocumentFragment();

const photos = createPhotos(20);
photos.forEach(({url, comments, likes}) => {
  const userPhoto = userPhotoTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__img').src = url;
  userPhoto.querySelector('.picture__comments').textContent = comments.length;
  userPhoto.querySelector('.picture__likes').textContent = likes;

  photosListFragment.append(userPhoto);
});

userPhotosContainer.append(photosListFragment);
