import { isEscapeKey } from './util.js';

const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const buttonBiggerElement = document.querySelector('.scale__control--bigger');
const scalePhotoElement = document.querySelector('.scale__control--value');
const modalCloseButton = document.querySelector('#upload-cancel');
const uploadFormOverlayElement = document.querySelector('.img-upload__overlay');
const photoUploadElement = document.querySelector('#upload-file');
const addHashtagElement = document.querySelector('.text__hashtags');
const addDescriptionElement = document.querySelector('.text__description');
const photoUploadPreviewElement = document.querySelector('.img-upload__preview img');

const SCALE_CHANGE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const modalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== addHashtagElement && document.activeElement !== addDescriptionElement) {
      closeModal();
    }
  }
};

function uploadModalOpen () {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', modalEscKeyHandler);
}

function closeModal () {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', modalEscKeyHandler);
  photoUploadElement.value = '';
  addHashtagElement.value = '';
  addDescriptionElement.value = '';
}

photoUploadElement.addEventListener('change', uploadModalOpen);
modalCloseButton.addEventListener('click', closeModal);

let scaleValue = SCALE_VALUE_MAX;
scalePhotoElement.value = `${scaleValue  }%`;

const scaleIncreaseClickHandler = () => {
  if (scaleValue > SCALE_VALUE_MIN) {
    scaleValue -= SCALE_CHANGE_STEP;
    scalePhotoElement.value = `${scaleValue  }%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const scaleDecreaseClickHandler = () => {
  if (scaleValue < SCALE_VALUE_MAX) {
    scaleValue += SCALE_CHANGE_STEP;
    scalePhotoElement.value = `${scaleValue  }%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

buttonSmallerElement.addEventListener('click', scaleIncreaseClickHandler);
buttonBiggerElement.addEventListener('click', scaleDecreaseClickHandler);

const uploadForm = document.querySelector('.img-upload__form');
const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,19}$', '');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field--error'
});

const validateHashtagsLength = (value) => {
  const hashtagsArr = value.trim().split(' ');
  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i].length > 20) {
      return false;
    }
  }
  return true;
};

const validateHashtagsQt = (value) => {
  const hashtagsArr = value.trim().split(' ');
  return hashtagsArr.length <= 5;
};

const validateHashtagsLetter = (value) => {
  const hashtagsArr = value.trim().split(' ');
  const valid = [];

  if (value === '') {
    return true;
  }

  for (let i = 0; i < hashtagsArr.length; i++) {
    if (re.test(hashtagsArr[i])) {
      valid[i] = true;
    }else {
      valid[i] = false;
    }
  }

  return !valid.includes(false);
};

const validateHashtagsDoubl = (value) => {
  const hashtagsArr = value.trim().toLowerCase().split(' ').sort();

  if (value === '' || hashtagsArr.length === 1) {
    return true;
  }

  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i + 1] === hashtagsArr[i]) {
      return false;
    }
  }

  return true;
};

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtagsLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtagsQt, 'Нельзя указать больше пяти хэш-тегов');
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtagsLetter, 'Хэш-тег может состоять только из букв и чисел и начинаться с #');
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtagsDoubl, 'Хэш-теги не должны повторяться');

const validateDescription = (value) => value.length < 140;

pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription, 'Максимальная длина 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
  // eslint-disable-next-line no-console
  console.log(pristine.validate());
});
