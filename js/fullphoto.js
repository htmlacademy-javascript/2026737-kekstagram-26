const fullPhoto = (photos) => {
  const fullPhotoModal = document.querySelector('.big-picture');
  const thumbnails = document.querySelectorAll('.picture');
  const modalPicture = fullPhotoModal.querySelector('.big-picture__img').querySelector('img');
  const likes = fullPhotoModal.querySelector('.likes-count');
  const commentsCount = fullPhotoModal.querySelector('.comments-count');
  const commentsList = fullPhotoModal.querySelector('.social__comments');
  const commentTemplate = commentsList.querySelector('.social__comment');
  const photoDescription = document.querySelector('.social__caption');
  const commentsCountModal = document.querySelector('.social__comment-count');
  const commentsLoaderButton = document.querySelector('.comments-loader');
  const modalCloseButton = document.querySelector('#picture-cancel');

  const addThumbnailHandler = (thumbnail, photo) => {
    thumbnail.addEventListener ('click', () => {
      fullPhotoModal.classList.remove('hidden');
      modalPicture.src = photo.url;
      likes.textContent = photo.likes;
      commentsCount.textContent = photo.comments.length;
      photoDescription.textContent = photo.description;

      while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
      }

      const commentsListFragment = document.createDocumentFragment();

      photo.comments.forEach(({avatar, name, message}) => {
        const comment = commentTemplate.cloneNode(true);
        comment.querySelector('.social__picture').src = avatar;
        comment.querySelector('.social__picture').alt = name;
        comment.querySelector('.social__text').textContent = message;
        commentsListFragment.append(comment);
      });

      commentsList.append(commentsListFragment);

      commentsCountModal.classList.add('hidden');
      commentsLoaderButton.classList.add('hidden');
      document.body.classList.add('modal-open');
    });
  };

  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailHandler(thumbnails[i], photos[i]);
  }

  modalCloseButton.addEventListener('click', () => {
    fullPhotoModal.classList.add('hidden');
    commentsCountModal.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhotoModal.classList.add('hidden');
      commentsCountModal.classList.remove('hidden');
      commentsLoaderButton.classList.remove('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {fullPhoto};
