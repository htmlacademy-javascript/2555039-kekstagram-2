import { EFFECTS } from './posts-data.js';

const CLASS_HIDDEN = 'hidden';

const imgElement = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');

let currentEffect = EFFECTS.none;
let sliderInitialized = false;

const setEffect = (value) => {
  imgElement.style.filter = currentEffect.name === 'none' ? 'none' : `${currentEffect.style}(${value}${currentEffect.unit})`;
};

const initSlider = () => {
  if (sliderInitialized) {
    return;
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.start,
    step: currentEffect.step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    const formattedValue = Number.isInteger(parseFloat(value)) ? parseFloat(value).toString() : parseFloat(value).toFixed(1);

    effectLevelValue.value = formattedValue;
    setEffect(formattedValue);
  });

  sliderInitialized = true;
};

// Функция для обновления параметров слайдера
const updateSliderOptions = (effect) => {
  if (!sliderInitialized) {
    return;
  }

  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.start,
    step: effect.step
  });
};

// Обработчик изменения эффекта
const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS[evt.target.value];

  if (currentEffect.name === 'none') {
    imgElement.style.filter = 'none';
    effectLevelValue.value = '';
    sliderContainer.classList.add(CLASS_HIDDEN);
  } else {
    sliderContainer.classList.remove(CLASS_HIDDEN);
    updateSliderOptions(currentEffect);
  }
};

// Функция сброса эффектов
const resetEffects = () => {
  if (sliderInitialized) {
    sliderElement.noUiSlider.destroy();
    sliderInitialized = false;
  }

  effectsList.removeEventListener('change', onEffectChange);
  currentEffect = EFFECTS.none;
  imgElement.style.filter = 'none';
  effectLevelValue.value = '';
  sliderContainer.classList.add(CLASS_HIDDEN);
};

// Инициализация эффектов
const initEffects = () => {
  sliderContainer.classList.add(CLASS_HIDDEN);
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
};

export { initEffects, resetEffects };
