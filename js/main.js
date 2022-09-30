const checkNumbers = (...args) => args.every((arg)=>typeof arg === 'number' && arg >= 0);

const swapTwoNumbers = (first, second) => [second, first];

const getRandomDecimal = (min, max , numberOfDecimals)=>{
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if(!isTargetNumbers){
    return NaN;
  }
  const [tempMin , tempMax] = min > max ? swapTwoNumbers(min, max) : [min, max];
  const randomNumber = +((Math.random() * (tempMax - tempMin) + tempMin).toFixed(numberOfDecimals));
  return randomNumber;
};

const getRandomNumber = (min, max)=>getRandomDecimal (min, max, 0);

getRandomNumber(3,5);
getRandomDecimal (0,4,3);
