import { EFFECTS } from './posts-data.js';

const imgElement = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');

const CLASS_HIDDEN = 'hidden';
let currentEffect = EFFECTS.none;

// Применение эффекта к изображению
const setEffect = (value) => {
  if (currentEffect.name === 'none') {
    imgElement.style.filter = 'none';
    return;
  }
  imgElement.style.filter = `${currentEffect.style}(${value}${currentEffect.unit})`;
};

// Инициализация слайдера
const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: { min: currentEffect.min, max: currentEffect.max },
    start: currentEffect.start,
    step: currentEffect.step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectLevelValue.value = value;
    setEffect(value);
  });
};

// Обновление параметров слайдера
const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    step: effect.step
  });
  sliderElement.noUiSlider.set(effect.start);
};

// Смена эффекта
const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')){
    return
  };

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  if (currentEffect.name === 'none') {
    sliderContainer.classList.add(CLASS_HIDDEN);
    imgElement.style.filter = 'none';
    effectLevelValue.value = '';
    sliderElement.noUiSlider.set(0);
  } else {
    sliderContainer.classList.remove(CLASS_HIDDEN);
    updateSliderOptions(currentEffect);
  }
};

// Сброс эффектов
const resetEffects = () => {
  setEffect('none'); // Сбрасываем эффект
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
