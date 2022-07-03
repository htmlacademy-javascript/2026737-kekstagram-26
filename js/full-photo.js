import { modalOpen } from './photo-modal.js';

const openFullPhoto = (photos) => {
  const fullPhotoModal = document.querySelector('.big-picture');
  const thumbnails = document.querySelectorAll('.picture');
  const modalPicture = fullPhotoModal.querySelector('.big-picture__img').querySelector('img');
  const likes = fullPhotoModal.querySelector('.likes-count');
  const commentsCount = fullPhotoModal.querySelector('.comments-count');
  const commentsList = fullPhotoModal.querySelector('.social__comments');
  const commentTemplate = commentsList.querySelector('.social__comment');
  const photoDescription = document.querySelector('.social__caption');

  const addThumbnailHandler = (thumbnail, photo) => {
    thumbnail.addEventListener ('click', () => {
      modalOpen();
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
    });
  };

  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailHandler(thumbnails[i], photos[i]);
  }
};

export {openFullPhoto};
