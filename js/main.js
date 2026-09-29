const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const DESCRIPTIONS = [
  'Отличный день!',
  'Прекрасное место для отдыха.',
  'Незабываемые впечатления.',
  'Хорошо провели время.',
  'Просто красивое фото.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Анна',
  'Иван',
  'Мария',
  'Алексей',
  'Екатерина',
  'Дмитрий',
  'Ольга',
];

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

let commentId = 1;

const createMessage = () => {
  const messagesCount = getRandomInteger(1, 2);
  let message = '';

  for (let i = 0; i < messagesCount; i += 1) {
    message += `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]} `;
  }

  return message.trim();
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: createMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    {length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)},
    createComment
  ),
});

const createPhotos = () => Array.from(
  {length: PHOTO_COUNT},
  (_, index) => createPhoto(index + 1)
);

createPhotos();
