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

const getLatLngString = ({ lat, lng }, numberOfDecimals = 5) =>
  `lat:${lat.toFixed(numberOfDecimals)}, lng:${lng.toFixed(numberOfDecimals)}`;

const debounce = (cb, delay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...rest), delay);
  };
};

const translateNumberToWord = (value, words) => {
  const number1 = value % 100;
  const number2 = value % 10;

  if (number1 > 10 && number1 < 20) {
    return words[2];
  }
  if (number2 > 1 && number2 < 5) {
    return words[1];
  }
  if (number2 === 1) {
    return words[0];
  }

  return words[2];
};

export { getRandomArrayElement, createRandomElementsArray, getRandomDecimal, getRandomNumber, getLatLngString, debounce, translateNumberToWord };
