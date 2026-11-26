const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const smallerButton = form.querySelector('.scale__control--smaller');
const biggerButton = form.querySelector('.scale__control--bigger');
const scaleInput = form.querySelector('.scale__control--value');
const previewImage = form.querySelector('.img-upload__preview img');

const updateScale = (value) => {
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  const newScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);

  updateScale(newScale);
};

const onBiggerButtonClick = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  const newScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);

  updateScale(newScale);
};

const resetScale = () => {
  updateScale(MAX_SCALE);
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

resetScale();

export {resetScale};
