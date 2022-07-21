import { sendData } from './api.js';
import { resetEffects } from './photo-effects-slider.js';
import { openSuccessMessageModal, openErrorMessageModal } from './upload-result-modals.js';
import { isEscapeKey } from './util.js';

const imageUploadElement = document.querySelector('.img-upload');
const buttonSmallerElement = imageUploadElement.querySelector('.scale__control--smaller');
const buttonBiggerElement = imageUploadElement.querySelector('.scale__control--bigger');
const scalePhotoElement = imageUploadElement.querySelector('.scale__control--value');
const modalCloseButton = imageUploadElement.querySelector('#upload-cancel');
const uploadFormOverlayElement = imageUploadElement.querySelector('.img-upload__overlay');
const photoUploadElement = imageUploadElement.querySelector('#upload-file');
const addHashtagElement = imageUploadElement.querySelector('.text__hashtags');
const addDescriptionElement = imageUploadElement.querySelector('.text__description');
const photoUploadPreviewElement = imageUploadElement.querySelector('.img-upload__preview img');
const photoUploadButton = imageUploadElement.querySelector('#upload-submit');
const fileChooserElement = imageUploadElement.querySelector('#upload-file');
const uploadForm = imageUploadElement.querySelector('.img-upload__form');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const SCALE_CHANGE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;
let scaleValue = SCALE_VALUE_MAX;

const DESCKRIPTION_LENGTH_MAX = 140;
const HASHTAG_LENGTH_MAX = 20;
const HASHTAGS_COUNT_MAX = 5;
const hashtagValidationRegex = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,19}$', '');

const modalEscKeyHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== addHashtagElement && document.activeElement !== addDescriptionElement) {
      closeModal();
    }
  }
};

function uploadModalOpen() {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', modalEscKeyHandler);
}

function closeModal() {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', modalEscKeyHandler);
  photoUploadElement.value = '';
  addHashtagElement.value = '';
  addDescriptionElement.value = '';
  resetEffects();
  scaleValue = SCALE_VALUE_MAX;
  scalePhotoElement.value = `${scaleValue}%`;
  photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
}

const scaleDecreaseClickHandler = () => {
  if (scaleValue > SCALE_VALUE_MIN) {
    scaleValue -= SCALE_CHANGE_STEP;
    scalePhotoElement.value = `${scaleValue}%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const scaleIncreaseClickHandler = () => {
  if (scaleValue < SCALE_VALUE_MAX) {
    scaleValue += SCALE_CHANGE_STEP;
    scalePhotoElement.value = `${scaleValue}%`;
    photoUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const validateHashtagsLength = (value) => {
  const hashtagsArr = value.trim().split(' ');
  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i].length > HASHTAG_LENGTH_MAX) {
      return false;
    }
  }
  return true;
};

const validateHashtagsQt = (value) => {
  const hashtagsArr = value.trim().split(' ');
  return hashtagsArr.length <= HASHTAGS_COUNT_MAX;
};

const validateHashtagsLetter = (value) => {
  const hashtagsArr = value.trim().split(' ');
  const valid = [];

  if (value === '') {
    return true;
  }

  for (let i = 0; i < hashtagsArr.length; i++) {
    valid[i] = hashtagValidationRegex.test(hashtagsArr[i]);
  }

  return !valid.includes(false);
};

const validateHashtagsDuplication = (value) => {
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

const validateDescription = (value) => value.length <= DESCKRIPTION_LENGTH_MAX;

const initPhotoUpload = () => {
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field--error'
  });

  pristine.addValidator(addHashtagElement, validateHashtagsLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
  pristine.addValidator(addHashtagElement, validateHashtagsQt, 'Нельзя указать больше пяти хэш-тегов');
  pristine.addValidator(addHashtagElement, validateHashtagsLetter, 'Хэш-тег может состоять только из букв и чисел и начинаться с #');
  pristine.addValidator(addHashtagElement, validateHashtagsDuplication, 'Хэш-теги не должны повторяться');
  pristine.addValidator(addDescriptionElement, validateDescription, 'Максимальная длина 140 символов');

  photoUploadElement.addEventListener('change', uploadModalOpen);
  modalCloseButton.addEventListener('click', closeModal);

  scalePhotoElement.value = `${scaleValue}%`;

  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      photoUploadPreviewElement.src = URL.createObjectURL(file);
    }
  });

  buttonSmallerElement.addEventListener('click', scaleDecreaseClickHandler);
  buttonBiggerElement.addEventListener('click', scaleIncreaseClickHandler);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      photoUploadButton.disabled = true;
      sendData(
        () => {
          closeModal();
          photoUploadButton.disabled = false;
          openSuccessMessageModal();
        },
        () => {
          openErrorMessageModal();
          photoUploadButton.disabled = false;
        },
        new FormData(evt.target),
      );
    }
  });
};

export { initPhotoUpload, modalEscKeyHandler };
