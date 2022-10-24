import { createRandomElementsArray, getLatLngString, getRandomArrayElement, getRandomDecimal, getRandomNumber } from './util.js';

const Coordinate = {
  LAT_MIN: 35.65,
  LAT_MAX: 35.70,
  LNG_MIN: 139.7,
  LNG_MAX: 139.8
};
const Price = {
  MIN: 1000,
  MAX: 100000
};
const Guest = {
  MIN: 0,
  MAX: 5
};
const Room = {
  MIN: 1,
  MAX: 4
};

const NUMBER_OF_DECIMALS = 5;

const NUMBER_OF_ADVERTISEMENTS = 10;

const IMG_NUMBERS = Array.from({ length: NUMBER_OF_ADVERTISEMENTS }, (_, index) => index + 1);

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKTIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createDataFiller = (photoData) => (_, index) => {
  const coordinate = {
    lat: getRandomDecimal(Coordinate.LAT_MIN, Coordinate.LAT_MAX, NUMBER_OF_DECIMALS),
    lng: getRandomDecimal(Coordinate.LNG_MIN, Coordinate.LNG_MAX, NUMBER_OF_DECIMALS)
  };

  return {
    author: {
      avatar: `img/avatars/user${photoData[index] < 10 ? (0).toString() + photoData[index] : photoData[index]}.png`
    },
    offer: {
      title: 'Лучший отель',
      address: getLatLngString(coordinate),
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(Room.MIN, Room.MAX),
      guests: getRandomNumber(Guest.MIN, Guest.MAX),
      checkin: getRandomArrayElement(CHECKTIMES),
      checkout: getRandomArrayElement(CHECKTIMES),
      features: createRandomElementsArray(FEATURES),
      description: 'Все комнаты в хорошем состоянии',
      photos: createRandomElementsArray(PHOTOS)
    },
    location: coordinate
  };
};

const generateData = (count = NUMBER_OF_ADVERTISEMENTS) => Array.from({ length: count }, createDataFiller(createRandomElementsArray(IMG_NUMBERS, false)));

export { generateData };
