import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const openErrorMessageModal = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.style.zIndex = '99';
  document.body.append(errorMessage);
  document.body.classList.add('modal-open');
  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    closeErrorMessageModal();
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      closeErrorMessageModal();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessageModal();
    }
  });
};

function closeErrorMessageModal () {
  document.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
}

const openSuccessMessageModal = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.body.classList.add('modal-open');
  successMessage.querySelector('.success__button').addEventListener('click', () => {
    closeSuccessMessageModal();
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeSuccessMessageModal();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessageModal();
    }
  });
};

function closeSuccessMessageModal () {
  document.querySelector('.success').remove();
  document.body.classList.remove('modal-open');
}
export {openErrorMessageModal, openSuccessMessageModal};
