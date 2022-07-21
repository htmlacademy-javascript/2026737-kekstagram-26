const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max || min < 0) {
    throw new Error('Ошибка');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export { getRandomNumber, isEscapeKey, showLoadErrorMessage, debounce, shuffle };
