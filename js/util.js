const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max || min < 0) {
    throw new Error('Ошибка');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLength = (string, maxLength) => string.length <= maxLength;

const getRandomElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const ERROR_MESSAGE_TIME = 3000;

const showLoadErrorMessage = (message) => {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.style.zIndex = '999';
  errorMessageElement.style.position = 'absolute';
  errorMessageElement.style.left = '50%';
  errorMessageElement.style.transform = 'translate(-50%)';
  errorMessageElement.style.top = '0';
  errorMessageElement.style.padding = '10px';
  errorMessageElement.style.fontSize = '26px';
  errorMessageElement.style.lineHeight = '1.5';
  errorMessageElement.style.textAlign = 'center';
  errorMessageElement.style.backgroundColor = 'tomato';

  errorMessageElement.textContent = message;

  document.body.append(errorMessageElement);

  setTimeout(() => {
    errorMessageElement.remove();
  }, ERROR_MESSAGE_TIME);
};

export {getRandomNumber, checkLength, getRandomElement, isEscapeKey, showLoadErrorMessage};
