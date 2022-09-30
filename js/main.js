const checkNumbers = (...args) => args.every((arg)=>typeof arg === 'number' && arg >= 0);

const swapTwoNumbers = (first, second) => {
  const swapNumber = first;
  first = second;
  second = swapNumber;
  return [first, second];
};

const getRandomNumber = (min, max)=>{
  const isTargetNumbers = checkNumbers(min, max);
  if(!isTargetNumbers){
    return NaN;
  }
  if (min > max){
    const numbers = swapTwoNumbers(min, max);
    [min, max] = numbers;
  }
  const randomNumber = Math.round(Math.random() * (max - min) + min);
  return min <= randomNumber && randomNumber <= max ? randomNumber : null ;
};

const getRandomDecimal = (min, max , numberOfDecimals)=>{
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if(!isTargetNumbers){
    return NaN;
  }
  if (min > max){
    const numbers = swapTwoNumbers(min, max);
    [min, max] = numbers;
  }
  const randomNumber = +((Math.random() * (max - min) + min).toFixed(numberOfDecimals));
  return min <= randomNumber && randomNumber <= max ? randomNumber : null ;
};

getRandomNumber(-5, 6.2);
getRandomDecimal (2.2, 7, 5);
