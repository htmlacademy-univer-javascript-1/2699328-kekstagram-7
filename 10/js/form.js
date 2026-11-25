import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {isEscapeKey} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const HASHTAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateHashtagFormat = (value) =>
  getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const validateHashtagCount = (value) =>
  getHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUniqueness = (value) => {
  const hashtags = getHashtags(value.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'Хештег должен начинаться с # и содержать от 1 до 19 букв или цифр после решётки'
);
pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  `Можно указать не больше ${MAX_HASHTAG_COUNT} хештегов`
);
pristine.addValidator(
  hashtagsInput,
  validateHashtagUniqueness,
  'Хештеги не должны повторяться, даже в разном регистре'
);

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  form.reset();
  resetScale();
  resetEffects();
  fileInput.value = '';
  pristine.reset();

  form.querySelectorAll('[aria-invalid]').forEach((field) => {
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  });
};

function onFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const onFileInputChange = () => {
  if (fileInput.files.length > 0) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onFormEscKeydown);
  }
};

const onTextFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

fileInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});
hashtagsInput.addEventListener('keydown', onTextFieldKeydown);
descriptionInput.addEventListener('keydown', onTextFieldKeydown);
form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
