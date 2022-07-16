import { isEscapeKey } from './util.js';

const fullPhotoModal = document.querySelector('.big-picture');
const modalCloseButton = fullPhotoModal.querySelector('#picture-cancel');

const commentsCountModalElement = fullPhotoModal.querySelector('.comments-loaded');
const commentsTotalNumberElement = fullPhotoModal.querySelector('.comments-count');
const commentsLoaderButton = fullPhotoModal.querySelector('.comments-loader');

const modalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closePhotoModal();
  }
};

const SHOW_COMMENTS = 5;

let commentsLoaded = SHOW_COMMENTS;
let currentComments = [];

const commentsListFragment = document.createDocumentFragment();

const renderComments = () => {
  const loadedComments = currentComments.slice(0, commentsLoaded);
  loadedComments.forEach(({avatar, name, message}) => {
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
  commentsTotalNumberElement.textContent = currentComments.length;
  if (currentComments.length > SHOW_COMMENTS) {
    commentsCountModalElement.textContent = SHOW_COMMENTS;
  }else {
    commentsCountModalElement.textContent = currentComments.length;
    commentsLoaderButton.classList.add('hidden');
  }
};

const loadComments = () => {
  commentsLoaded += 5;
  renderComments();
  fullPhotoModal.querySelector('.social__comments').replaceChildren(commentsListFragment);
  commentsCountModalElement.textContent = fullPhotoModal.querySelector('.social__comments').children.length;

  if (fullPhotoModal.querySelector('.social__comments').children.length === currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
};

commentsLoaderButton.addEventListener('click', loadComments);

const openPhotoModal = (photo) => {
  fullPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullPhotoModal.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  fullPhotoModal.querySelector('.likes-count').textContent = photo.likes;
  fullPhotoModal.querySelector('.comments-count').textContent = `${photo.comments.length}`;
  fullPhotoModal.querySelector('.social__caption').textContent = photo.description;
  currentComments = photo.comments;

  renderComments();

  fullPhotoModal.querySelector('.social__comments').replaceChildren(commentsListFragment);

  document.addEventListener('keydown', modalEscKeyHandler);
};

function closePhotoModal () {
  fullPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', modalEscKeyHandler);
  commentsLoaded = 5;
  commentsLoaderButton.classList.remove('hidden');
}

modalCloseButton.addEventListener('click', closePhotoModal);

export {openPhotoModal};
