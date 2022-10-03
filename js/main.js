const LAT_MIN = 35.65;
const LAT_MAX = 35.70;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_GUESTS = 0;
const MAX_GUESTS = 5;
const MIN_ROOMS = 1;
const MAX_ROOMS = 4;
const NUMBER_OF_DECIMALS = 5;
const NUMBER_OF_ADVERTISEMENTS = 10;
const IMG_NUMBERS = Array.from({ length: NUMBER_OF_ADVERTISEMENTS }, (element, index) => index + 1);
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const checkNumbers = (...numbers) => numbers.every((number) => typeof number === 'number' && number >= 0);

const swapTwoNumbers = (firstNumber, secondNumber) => [secondNumber, firstNumber];

const getRandomDecimal = (min, max, numberOfDecimals) => {
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if (!isTargetNumbers) {
    return NaN;
  }
  const [tempMin, tempMax] = min > max ? swapTwoNumbers(min, max) : [min, max];
  const randomNumber = (Math.random() * (tempMax - tempMin) + tempMin);
  return +randomNumber.toFixed(numberOfDecimals);
};

const getRandomNumber = (min, max) => getRandomDecimal(min, max, 0);

const getRandomArrayIndex = (elements, from = 0) => getRandomNumber(from, elements.length - 1);

const getRandomArrayElement = (elements) => elements[getRandomArrayIndex(elements)];

const createRandomElementsArray = (elements, isRandomLength = true) => {
  const arr = [];
  const randomElements = {};
  let arrLength = getRandomNumber(1, elements.length);
  if (!isRandomLength) {
    arrLength = elements.length;
  }
  let randomElement;
  for (let i = 0; i < arrLength; i++) {
    do {
      randomElement = getRandomArrayElement(elements);
    } while (randomElements[randomElement]);
    arr.push(randomElement);
    randomElements[randomElement] = 'pushed';
  }
  return arr;
};

const randomImgNumbers = createRandomElementsArray(IMG_NUMBERS, false);

const createAdvertisement = (element, index) => {
  const randomLat = getRandomDecimal(LAT_MIN, LAT_MAX, NUMBER_OF_DECIMALS);
  const randomLng = getRandomDecimal(LNG_MIN, LNG_MAX, NUMBER_OF_DECIMALS);
  return {
    author: {
      avatar: `img/avatars/user${randomImgNumbers[index] < 10 ? (0).toString() + randomImgNumbers[index] : randomImgNumbers[index]}.png`
    },
    offer: {
      title: 'Лучший отель',
      address: `${randomLat}, ${randomLng}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: createRandomElementsArray(FEATURES),
      description: 'Все комнаты в хорошем состоянии',
      photos: createRandomElementsArray(PHOTOS)
    },
    location: {
      lat: randomLat,
      lng: randomLng
    }
  };
};

Array.from({ length: NUMBER_OF_ADVERTISEMENTS }, createAdvertisement);
