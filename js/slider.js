import { QuerySelector } from './dom-util.js';
import { adFormPristine } from './pristine-setup.js';

const sliderElement = document.querySelector(QuerySelector.CLASS_NAME.SLIDER);
const priceFieldElement = document.querySelector(QuerySelector.ID.PRICE);
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

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: +priceFieldElement.min,
      max: +priceFieldElement.max
    },
  });

  if (!wasSliderDragged) {
    sliderElement.noUiSlider.set(priceFieldElement.min);
  }

  if (priceFieldElement.min === priceFieldElement.value) {
    priceFieldElement.value = '';
    wasSliderDragged = false;
  }
};

const addSliderListeners = () => {
  sliderElement.noUiSlider.on('start', () => {
    wasSliderDragged = true;
  });

  sliderElement.noUiSlider.on('update', () => {
    if (wasSliderDragged) {
      priceFieldElement.value = sliderElement.noUiSlider.get();
      adFormPristine.validate(priceFieldElement);
    }
  });

  sliderElement.noUiSlider.on('end', () => {
    if (priceFieldElement.min === priceFieldElement.value) {
      priceFieldElement.value = '';
      wasSliderDragged = false;
    }
  });
};

export { addSliderListeners, updateSlider };
