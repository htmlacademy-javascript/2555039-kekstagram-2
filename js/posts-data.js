export const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

export const RANDOM_PHOTO_MAX = 10;
export const DEBOUNCE_TIME = 500;
export const ALERT_SHOW_TIME = 5000;
export const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const submitButtonTexts = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

const EFFECTS = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  },
};

const getDataPosts = () => {
  const DESCRIPTIONS = [
    'Моменты, которые важно сохранить',
    'Красота простых вещей',
    'Тихий вечер в любимом месте',
    'Когда мечты становятся реальностью',
    'Свет и тень в гармонии',
    'Природа говорит сама за себя',
    'Каждый кадр рассказывает историю',
    'День, который запомнится навсегда',
    'Там, где начинается вдохновение',
    'Прогулки, которые наполняют душу',
    'Секреты за каждым поворотом',
    'Силуэт в лучах заката',
    'Когда время замирает',
    'Моменты, которые делают нас счастливыми',
    'Взгляд на мир с другой стороны',
    'Красота, которая окружает нас каждый день',
    'Небо, которое невозможно забыть',
    'Пейзаж, от которого захватывает дух',
    'Воспоминания, которые остаются навсегда',
    'Простые радости жизни',
    'Каждая деталь имеет значение',
    'Шаг за шагом к мечте',
    'Тишина, которая говорит громче слов',
    'Вдохновение в каждом мгновении',
    'Место, где хочется остаться надолго'
  ];

  const COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const NAMES = [
    'Алексей',
    'Борис',
    'Владимир',
    'Григорий',
    'Дмитрий',
    'Екатерина',
    'Жанна',
    'Зинаида',
    'Иван',
    'Кирилл',
    'Людмила',
    'Мария',
    'Наталья',
    'Олег',
    'Петр',
    'Роман',
    'Светлана',
    'Татьяна',
    'Ульяна',
    'Федор',
    'Харитон',
    'Юлия',
    'Яна',
    'Василиса',
    'Евгений'
  ];

  return { DESCRIPTIONS, COMMENTS, NAMES };
};

export { getDataPosts, EFFECTS };
