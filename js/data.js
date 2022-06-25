import { getRandomNumber } from '../js/util.js';

const PHOTO_DESCRIPTION = [
  'Это моё довольно голодное лицо.',
  '50 оттенков темных кругов под глазами.',
  'Я не знаю, куда иду, но я уже туда еду.',
  'Улыбайтесь широко, смейтесь часто.',
  'Избегай обыденного.',
  'Прокатись на моей энергии.',
  'Я в настроении босса.',
  'Будь воином, а не паникером.',
  'Не мечтай об этом. Тренируйтесь для этого.',
  'Пусть будет больно, а потом отпусти.',
  'Счастье никогда не выходит из моды.',
  'Немного очертаний и уверенности.',
  'Улыбайся больше, меньше сожалей.',
  'Растите через то, через что вы проходите.',
  'Круглосуточная диета с шампанским.',
  'Врасплох, но в точку!'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Карчагин Игорь',
  'Соломинцев Матвей',
  'Чернов Ираклий',
  'Печкин Ярослав',
  'Мандрыка Мария',
  'Носков Тимофей',
  'Серпионов Гаврила',
  'Кирпа Юрий',
  'Самойлов Виктор',
  'Дворецкова Евгения',
  'Ясаев Артём',
  'Яблонев Моисей',
  'Шушалев Денис',
  'Ягуткина Татьяна',
  'Лелуха Янина',
  'Аверьянов Владислав',
  'Полыгалов Владислав',
  'Кваснина Полина'
];

const USER_PHOTO_COUNT = 25;

const idPhoto = [];
const getId = (id) => {
  if (id.length === 0) {
    id[id.length] = id.length + 1;
    return id[0];
  }
  id[id.length] = id[id.length - 1] + 1;
  return id[id.length -1];
};

const urlIndex = [];
const getUrl = (i) => {
  if (i.length === 0) {
    i[i.length] = i.length + 1;
    return i[0];
  }
  i[i.length] = i[i.length - 1] + 1;
  return i[i.length -1];
};

const getRandomElement = (element) => element[getRandomNumber(0, element.length - 1)];

const commentId = [];
const getRandomCommentId = (id) => {
  let randomId = getRandomNumber(1, id.length * 10 + 2);
  while(commentId.includes(randomId)) {
    randomId = getRandomNumber(1, id.length * 3 + 2);
  }
  id[id.length] = randomId;
  return id[id.length -1];
};

const getMessage = () => {
  const messagesCount = getRandomNumber(1, 2);
  let message = getRandomElement(MESSAGES);
  if (messagesCount > 1) {
    message += getRandomElement(MESSAGES);
  }
  return message;
};

const getRandomComment = () => ({
  id: getRandomCommentId(commentId),
  avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
  message: getMessage(),
  name: getRandomElement(NAMES)
});


const createUserPhoto = () => ({
  id: getId(idPhoto),
  url: `photos/${  getUrl(urlIndex)  }.jpg`,
  description: getRandomElement(PHOTO_DESCRIPTION),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 3)}, getRandomComment),
});

const createUserPhotos = () => Array.from({length: USER_PHOTO_COUNT}, createUserPhoto);

export {createUserPhotos};
