import { QuerySelector } from './dom-util.js';

const sliderElement = document.querySelector(QuerySelector.CLASS_NAME.SLIDER);
let wasSliderDragged;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  connect: 'lower',
  start: 0,
  step: 1,
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

const updateSlider = (inputElement) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: +inputElement.min,
      max: +inputElement.max
    },
  });

  if (!wasSliderDragged) {
    sliderElement.noUiSlider.set(inputElement.min);
  }

  if (inputElement.min === inputElement.value) {
    inputElement.value = '';
    wasSliderDragged = false;
  }
};
const resetSlider = (inputElement) => {
  wasSliderDragged = false;
  updateSlider(inputElement);
};

const setSlider = (inputElement, pristine) => {
  updateSlider(inputElement);

  sliderElement.noUiSlider.on('start', () => {
    wasSliderDragged = true;
  });

  sliderElement.noUiSlider.on('update', () => {
    if (wasSliderDragged) {
      inputElement.value = sliderElement.noUiSlider.get();
      pristine.validate(inputElement);
    }
  });

  sliderElement.noUiSlider.on('end', () => {
    if (inputElement.min === inputElement.value) {
      inputElement.value = '';
      wasSliderDragged = false;
    }
  });
};

export { setSlider, updateSlider, resetSlider };
