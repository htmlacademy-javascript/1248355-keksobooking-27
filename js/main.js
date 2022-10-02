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

getRandomNumber(3, 5);
getRandomDecimal(0, 4, 3);
