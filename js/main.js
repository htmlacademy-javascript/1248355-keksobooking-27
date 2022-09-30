const checkNumbers = (...args) => args.every((arg)=>typeof arg === 'number' && arg >= 0);

const swapTwoNumbers = (first, second) => [second, first];

const getRandomDecimal = (min, max , numberOfDecimals)=>{
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if(!isTargetNumbers){
    return NaN;
  }
  const [tempMin , tempMax] = min > max ? swapTwoNumbers(min, max) : [min, max];
  const randomNumber = +((Math.random() * (tempMax - tempMin) + tempMin).toFixed(numberOfDecimals));
  return tempMin <= randomNumber && randomNumber <= tempMax ? randomNumber : null ;
};

const getRandomNumber = (min, max)=>getRandomDecimal (min,max, 0);

getRandomNumber(3,5);
getRandomDecimal (0,4,3);

//Число вылетает из диапозона бех проверки при следующих значениях:
/*
let random = 1;
do {
  random = getRandomDecimal(2.34, 4.67, 1);
  console.log(random); // random 2.3 или 4.7
} while (random !== null);

let random = 1;
do {
  random = getRandomDecimal(6.2,6.7, 0);
  console.log(random); // random 6 или 7
} while (random !== null);

*/
