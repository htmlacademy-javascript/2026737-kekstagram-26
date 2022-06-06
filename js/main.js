// возвращающает случайное целое число из переданного диапазона включительно
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max || min < 0) {
    throw new Error('Ошибка');
  }
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

//Проверяет максимальную длину строки
function checkLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}
