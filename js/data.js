import { getRandomNumber, getRandomElement } from '../js/util.js';

const photoDescriptions = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
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

const getMessage = () => {
  const messagesCount = getRandomNumber(1, 2);
  let message = getRandomElement(messages);
  if (messagesCount > 1) {
    message += getRandomElement(messages);
  }
  return message;
};

let currentCommentId = 1;

const createComment = () => ({
  id: currentCommentId++,
  avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
  message: getMessage(),
  name: getRandomElement(names)
});

let currentPhotoId = 1;

const createPhoto = (_, index) => ({
  id: currentPhotoId++,
  url: `photos/${  index + 1  }.jpg`,
  description: getRandomElement(photoDescriptions),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 3)}, createComment),
});

const createPhotos = (count) => Array.from({length: count}, createPhoto);

export {createPhotos};
