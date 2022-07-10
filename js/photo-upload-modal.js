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
const photoFiltersListElement = document.querySelector('.effects');
const photoFilterItemElement = photoFiltersListElement.querySelectorAll('.effects__radio');


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

let scaleValue = 100;
scalePhotoElement.value = `${scaleValue  }%`;

const changeScaleSmaller = () => {
  if (scaleValue > 25) {
    scaleValue -= 25;
    scalePhotoElement.value = `${scaleValue  }%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const changeScaleBigger = () => {
  if (scaleValue < 100) {
    scaleValue += 25;
    scalePhotoElement.value = `${scaleValue  }%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

buttonSmallerElement.addEventListener('click', changeScaleSmaller);
buttonBiggerElement.addEventListener('click', changeScaleBigger);

const addFilterRadioHandler = (item) => {
  item.addEventListener('change', () => {
    photoUploadPreviewElement.classList = '';
    photoUploadPreviewElement.classList.add(`effects__preview--${  item.value}`);
  });
};

photoFilterItemElement.forEach((item) => {
  addFilterRadioHandler(item);
});

const uploadForm = document.querySelector('.img-upload__form');
const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,19}$', '');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field--error'
});

const validateHashtagsLength = (value) => {
  const hashtagsArr = value.trim().split(' ');
  let j = 0;
  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i].length > 20) {
      return false;
    }else {
      j++;
    }
  }

  return j === hashtagsArr.length;
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

  if (valid.includes(false)) {
    return false;
  }else {
    return true;
  }
};

const validateHashtagsDoubl = (value) => {
  const hashtagsArr = value.trim().toLowerCase().split(' ').sort();
  let valid = [];

  if (value === '' || hashtagsArr.length === 1) {
    return true;
  }

  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i + 1] === hashtagsArr[i]) {
      valid[i] = false;
    }else {
      valid[i] = true;
    }
  }

  if (valid.includes(false)) {
    valid = [];
    return false;
  }else {
    valid = [];
    return true;
  }
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
