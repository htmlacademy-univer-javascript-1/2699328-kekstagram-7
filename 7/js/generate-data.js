import {getRandomInteger} from './util.js';

import {
  PHOTO_COUNT,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_AVATAR_NUMBER,
  MAX_AVATAR_NUMBER,
  DESCRIPTIONS,
  MESSAGES,
  NAMES
} from './data.js';

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

export {createPhotos};
