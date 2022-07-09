import { isEscapeKey } from './util.js';


const modalCloseButton = document.querySelector('#picture-cancel');
const fullPhotoModal = document.querySelector('.big-picture');


const commentsCountModal = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

const modalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closePhotoModal();
  }
};

const openPhotoModal = (photo) => {
  fullPhotoModal.classList.remove('hidden');
  commentsCountModal.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');

  fullPhotoModal.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  fullPhotoModal.querySelector('.likes-count').textContent = photo.likes;
  fullPhotoModal.querySelector('.comments-count').textContent = `${photo.comments.length}`;
  fullPhotoModal.querySelector('.social__caption').textContent = photo.description;
  const commentsListFragment = document.createDocumentFragment();

  photo.comments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    const commentAvatar =  document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    comment.append(commentAvatar);
    comment.append(commentText);
    commentsListFragment.append(comment);
  });

  fullPhotoModal.querySelector('.social__comments').replaceChildren(commentsListFragment);

  document.addEventListener('keydown', modalEscKeyHandler);
};

function closePhotoModal () {
  fullPhotoModal.classList.add('hidden');
  commentsCountModal.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', modalEscKeyHandler);
}

modalCloseButton.addEventListener('click', closePhotoModal);

export {openPhotoModal};
