const Coordinates = {
  LAT_MIN: 35.65,
  LAT_MAX: 35.70,
  LNG_MIN: 139.7,
  LNG_MAX: 139.8
};
const Price = {
  MIN: 1000,
  MAX: 100000
};
const Guests = {
  MIN: 0,
  MAX: 5
};
const Rooms = {
  MIN: 1,
  MAX: 4
};

const NUMBER_OF_DECIMALS = 5;

const NUMBER_OF_ADVERTISEMENTS = 10;

const IMG_NUMBERS = Array.from({ length: NUMBER_OF_ADVERTISEMENTS }, (element, index) => index + 1);

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKTIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const checkNumbers = (...numbers) => numbers.every((number) => typeof number === 'number' && number >= 0);

const getRandomDecimal = (min, max, numberOfDecimals = 0) => {
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if (!isTargetNumbers) {
    return NaN;
  }

  const [tempMin, tempMax] = min > max ? [max, min] : [min, max];
  const randomNumber = (Math.random() * (tempMax - tempMin) + tempMin);
  return +randomNumber.toFixed(numberOfDecimals);
};

const getRandomNumber = (min, max) => getRandomDecimal(min, max);

const getRandomArrayIndex = (elements) => getRandomNumber(0, elements.length - 1);

const getRandomArrayElement = (elements) => elements[getRandomArrayIndex(elements)];

const createRandomElementsArray = (elements, isRandomLength = true) => {
  const arrCopy = [...elements];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const randomIndex = getRandomNumber(0, i);
    [arrCopy[i], arrCopy[randomIndex]] = [arrCopy[randomIndex], arrCopy[i]];
  }

  const arrLength = isRandomLength ? getRandomNumber(1, arrCopy.length) : arrCopy.length;
  return arrCopy.slice(0, arrLength);
};

const createAdvertisementsFillerFn = (photoData) => (element, index) => {
  const randomLat = getRandomDecimal(Coordinates.LAT_MIN, Coordinates.LAT_MAX, NUMBER_OF_DECIMALS);
  const randomLng = getRandomDecimal(Coordinates.LNG_MIN, Coordinates.LNG_MAX, NUMBER_OF_DECIMALS);

  return {
    author: {
      avatar: `img/avatars/user${photoData[index] < 10 ? (0).toString() + photoData[index] : photoData[index]}.png`
    },
    offer: {
      title: 'Лучший отель',
      address: `${randomLat}, ${randomLng}`,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: getRandomArrayElement(CHECKTIMES),
      checkout: getRandomArrayElement(CHECKTIMES),
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

Array.from({ length: NUMBER_OF_ADVERTISEMENTS }, createAdvertisementsFillerFn(createRandomElementsArray(IMG_NUMBERS, false)));
