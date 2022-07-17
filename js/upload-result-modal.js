import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const errorModalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorMessageModal();
  }
};

const errorModalClickHandler = (evt) => {
  if (evt.target.matches('.error')) {
    closeErrorMessageModal();
  }
};

const successModalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessMessageModal();
  }
};

const successModalClickHandler = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessMessageModal();
  }
};


const openErrorMessageModal = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.style.zIndex = '99';
  document.body.append(errorMessage);
  document.body.classList.add('modal-open');
  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    closeErrorMessageModal();
  });
  document.addEventListener('click', errorModalClickHandler);
  document.addEventListener('keydown', errorModalEscKeyHandler);
};


function closeErrorMessageModal() {
  const modal = document.querySelector('.error');
  modal.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', errorModalClickHandler);
  document.removeEventListener('keydown', errorModalEscKeyHandler);
}

const openSuccessMessageModal = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.body.classList.add('modal-open');
  successMessage.querySelector('.success__button').addEventListener('click', () => {
    closeSuccessMessageModal();
  });
  document.addEventListener('click', successModalClickHandler);
  document.addEventListener('keydown', successModalEscKeyHandler);
};

function closeSuccessMessageModal() {
  const modal = document.querySelector('.success');
  modal.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', successModalClickHandler);
  document.removeEventListener('keydown', successModalEscKeyHandler);
}

export { openErrorMessageModal, openSuccessMessageModal };
