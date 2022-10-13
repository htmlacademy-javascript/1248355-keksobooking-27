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

export { getRandomArrayElement, createRandomElementsArray, getRandomDecimal, getRandomNumber};
