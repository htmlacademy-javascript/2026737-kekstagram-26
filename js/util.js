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

export {getRandomNumber, checkLength, getRandomElement};
