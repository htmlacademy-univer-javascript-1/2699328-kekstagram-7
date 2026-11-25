const DEFAULT_EFFECT = 'none';

const EFFECTS = {
  none: {filter: '', min: 0, max: 1, step: 0.1, unit: ''},
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
};

const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsList = form.querySelector('.effects__list');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const effectLevelInput = form.querySelector('.effect-level__value');
const sliderElement = form.querySelector('.effect-level__slider');
const originalEffect = form.querySelector('#effect-none');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const onEffectLevelUpdate = (values) => {
  if (currentEffect === DEFAULT_EFFECT) {
    previewImage.style.filter = '';
    effectLevelInput.value = '';
    return;
  }

  const {filter, unit} = EFFECTS[currentEffect];
  const value = Number(values[0]);

  previewImage.style.filter = `${filter}(${value}${unit})`;
  effectLevelInput.value = value;
};

const changeEffect = (effect) => {
  currentEffect = effect;

  effectLevelContainer.classList.toggle(
    'hidden',
    currentEffect === DEFAULT_EFFECT
  );

  const {min, max, step} = EFFECTS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step,
    start: max
  });
};

const onEffectsChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    changeEffect(evt.target.value);
  }
};

const resetEffects = () => {
  originalEffect.checked = true;
  changeEffect(DEFAULT_EFFECT);
};

sliderElement.noUiSlider.on('update', onEffectLevelUpdate);
effectsList.addEventListener('change', onEffectsChange);

resetEffects();

export {resetEffects};
