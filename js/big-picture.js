
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.replaceChildren(fragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const closeBigPicture = () => {
  hideBigPicture();
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigPicture = ({url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;

  renderComments(comments);

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
