import {openPhotoModal} from './photo-modal.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = `${photo.comments.length}`;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.addEventListener ('click', () => {
      openPhotoModal(photo);
    });

    photosListFragment.append(photoElement);
  });

  photosContainer.append(photosListFragment);
};

export {renderPhotos};
