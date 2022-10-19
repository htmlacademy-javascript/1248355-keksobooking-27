import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { adFormPristine } from './pristine-setup.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityELement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomNumberElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);
const typeFieldElement = adFormElement.querySelector(QuerySelector.ID.TYPE);
const priceFieldElement = adFormElement.querySelector(QuerySelector.ID.PRICE);
const sliderElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.SLIDER);
const timeinFieldElement = adFormElement.querySelector(QuerySelector.ID.TIMEIN);
const timeoutFieldElement = adFormElement.querySelector(QuerySelector.ID.TIMEOUT);
const checkTimeContainerElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.CHECK_TIME_CONTAINER);
const adFormsfieldsetElements = adFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
const mapFormElement = document.querySelector(QuerySelector.CLASS_NAME.MAP_FORM);
const mapFormsElements = mapFormElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
const mapFormsFieldsetElements = mapFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
let wasSliderDragged;

const typeToMinPrice = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
  hotel: '3000'
};
const idToElement = {
  'timein': timeoutFieldElement,
  'timeout': timeinFieldElement
};

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

const toggleFormsDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleDisabledState(mapFormsElements);
  toggleDisabledState(mapFormsFieldsetElements);
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

const updatePriceFieldAttributes = () => {
  priceFieldElement.placeholder = typeToMinPrice[typeFieldElement.value];
  priceFieldElement.min = typeToMinPrice[typeFieldElement.value];

  if (priceFieldElement.value) {
    adFormPristine.validate(priceFieldElement);
  }
};

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

// События формы
checkTimeContainerElement.addEventListener('change', (evt) => {
  evt.stopPropagation();
  idToElement[evt.target.id].value = evt.target.value;
});

capacityELement.addEventListener('change', () => {
  adFormPristine.validate(roomNumberElement);
});

typeFieldElement.addEventListener('change', () => {
  updatePriceFieldAttributes();
  updateSlider();
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (adFormPristine.validate()) {
    adFormElement.submit();
  }
});

// События слайдера
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

export { toggleFormsDisebledState, updatePriceFieldAttributes, updateSlider };
