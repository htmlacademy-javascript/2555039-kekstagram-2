const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

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

const createRandomPost = () => {
  const generateRandomPostId = getRandomIdFromRangeGenerator(1, 25);
  const generateRandomPhotoId = getRandomIdFromRangeGenerator(1, 25);

  const postId = generateRandomPostId();
  const photoId = generateRandomPhotoId();
  const photoUrl = `photos/${photoId}.jpg`;
  const likes = getRandomInteger(15, 200);
  const commentsNumber = getRandomInteger(0, 30);

  const comment = () => {
    const generateRandomCommentId = getRandomIdFromRangeGenerator(1, 10000);
    const commentId = generateRandomCommentId();
    const avatarUrl = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const randomCommentIndex = getRandomInteger(0, COMMENTS.length - 1);
    const randomNameIndex = getRandomInteger(0, NAMES.length - 1);

    return {
      id: commentId,
      avatar: avatarUrl,
      message: COMMENTS[randomCommentIndex],
      name: NAMES[randomNameIndex],
    };
  };

  const commentsArray = Array.from({ length: commentsNumber }, comment);

  return {
    id: postId,
    url: photoUrl,
    description: DESCRIPTIONS[photoId - 1],
    likes: likes,
    comments: commentsArray,
  };
};

const posts = Array.from({ length: 25 }, createRandomPost);

posts();
