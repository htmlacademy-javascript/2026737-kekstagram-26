const sliderElement = document.querySelector('.effect-level__slider');
const effectsLevelElement = document.querySelector('.effect-level__value');
const photoUploadPreviewElement = document.querySelector('.img-upload__preview img');

const EFFECTS = {
  'NONE': {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    effect: '',
    effectUnit: '',
  },
  'CHROME': {
    min: 0,
    max: 1,
    start: 0,
    step: 0.1,
    effect: 'grayscale',
    effectUnit: '',
  },
  'SEPIA': {
    min: 0,
    max: 1,
    start: 0,
    step: 0.1,
    effect: 'sepia',
    effectUnit: '',
  },
  'MARVIN': {
    min: 0,
    max: 100,
    start: 0,
    step: 1,
    effect: 'invert',
    effectUnit: '%',
  },
  'PHOBOS': {
    min: 0,
    max: 3,
    start: 0,
    step: 0.1,
    effect: 'blur',
    effectUnit: 'px',
  },
  'HEAT': {
    min: 1,
    max: 3,
    start: 0,
    step: 0.1,
    effect: 'brightness',
    effectUnit: '',
  },
};

const DEFAULT_EFFECT = EFFECTS.NONE;
let currentEffect = DEFAULT_EFFECT;
let currentEffectName;

sliderElement.classList.add('hidden');

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (currentEffect === DEFAULT_EFFECT) {
    sliderElement.classList.add('hidden');
  }
};

const sliderUpdateHandler = () => {
  photoUploadPreviewElement.style.filter = 'none';
  photoUploadPreviewElement.classList = '';
  effectsLevelElement.value = '';

  const sliderValue = sliderElement.noUiSlider.get();
  photoUploadPreviewElement.style.filter = `${currentEffect.effect}(${sliderValue}${currentEffect.effectUnit})`;
  photoUploadPreviewElement.classList.add = (`effects__preview--${currentEffectName}`);
  effectsLevelElement.value = sliderValue;
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
});
const addFilterRadioHandler = (event) => {
  event.addEventListener('change', (evt) => {
    currentEffectName = evt.target.value;
    currentEffect = currentEffectName.toUpperCase();
    currentEffect = EFFECTS[currentEffect];
    updateSlider();
  });
};

const inputs = document.querySelectorAll('.effects__radio');
inputs.forEach((item)  => {
  addFilterRadioHandler(item);
});

sliderElement.noUiSlider.on('update', sliderUpdateHandler);

