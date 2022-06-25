// возвращающает случайное целое число из переданного диапазона включительно
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max || min < 0) {
    throw new Error('Ошибка');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Проверяет максимальную длину строки
const checkLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

export {getRandomNumber};

checkLength('Hello', 5);
