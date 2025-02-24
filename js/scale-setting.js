const scaleControl = document.querySelector('.scale');
const scaleControllSmaller = scaleControl.querySelector('.scale__control--smaller');
const scaleControllBigger = scaleControl.querySelector('.scale__control--bigger');
const scaleControllValue = scaleControl.querySelector('.scale__control--value');
const imgElementPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_DEFAULT_VALUE = 100;

let currentScaleValue = SCALE_DEFAULT_VALUE;

const changeScale = () => {
  scaleControllValue.setAttribute('value', `${currentScaleValue}%`);
  imgElementPreview.style.transform = `scale(${currentScaleValue / 100})`;
};

const lessButtonClick = () => {
  currentScaleValue = Math.max(currentScaleValue - SCALE_STEP, SCALE_MIN_VALUE);
  changeScale();
};

const biggerButtonClick = () => {
  currentScaleValue = Math.min(currentScaleValue + SCALE_STEP, SCALE_MAX_VALUE);
  changeScale();
};

const scaleReset = () => {
  currentScaleValue = SCALE_DEFAULT_VALUE;
  changeScale();
};

const initScale = () => {
  scaleControllSmaller.addEventListener('click', lessButtonClick);
  scaleControllBigger.addEventListener('click', biggerButtonClick);
  changeScale();
};

export { initScale, scaleReset };
