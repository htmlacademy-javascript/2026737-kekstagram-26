const renderPhotos = (photos) => {
  const photosContainer = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, comments, likes}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    photosListFragment.append(photoElement);
  });

  photosContainer.append(photosListFragment);
};

export {renderPhotos};
