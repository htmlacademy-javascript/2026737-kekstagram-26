import { isEscapeKey } from './util.js';

const modalCloseButton = document.querySelector('#picture-cancel');
const fullPhotoModal = document.querySelector('.big-picture');
const commentsCountModal = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

const modalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
};

function modalOpen () {
  fullPhotoModal.classList.remove('hidden');
  commentsCountModal.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', modalEscKeyHandler);
}

function closeModal () {
  fullPhotoModal.classList.add('hidden');
  commentsCountModal.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', modalEscKeyHandler);
}

modalCloseButton.addEventListener('click', closeModal);

export {modalOpen};
