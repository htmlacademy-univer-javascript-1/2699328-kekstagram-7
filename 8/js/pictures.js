
import {openBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (photo) => {
  const picture = pictureTemplate.cloneNode(true);

  const image = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  image.src = photo.url;
  image.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return picture;
};

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createPicture(photo));
  });

  picturesContainer.append(fragment);
};

export {renderPictures};
