import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { adFormPristine } from './pristine-setup.js';
import { setSlider, updateSlider } from './slider.js';
import { getLatLngString } from './util.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityELement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomNumberElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);
const typeInputElement = adFormElement.querySelector(QuerySelector.ID.TYPE);
const priceInputElement = adFormElement.querySelector(QuerySelector.ID.PRICE);
const timeinInputElement = adFormElement.querySelector(QuerySelector.ID.TIMEIN);
const timeoutInputElement = adFormElement.querySelector(QuerySelector.ID.TIMEOUT);
const addressInputElement = document.querySelector(QuerySelector.ID.ADDRESS);
const checkTimeContainerElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.CHECK_TIME_CONTAINER);
const adFormsfieldsetElements = adFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
const mapFormElement = document.querySelector(QuerySelector.CLASS_NAME.MAP_FORM);
const mapFormsElements = mapFormElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
const mapFormsFieldsetElements = mapFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);

const typeToMinPrice = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
  hotel: '3000'
};
const idToElement = {
  'timein': timeoutInputElement,
  'timeout': timeinInputElement
};

const toggleFormsDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleDisabledState(mapFormsElements);
  toggleDisabledState(mapFormsFieldsetElements);
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

const updatePriceFieldAttributes = () => {
  priceInputElement.placeholder = typeToMinPrice[typeInputElement.value];
  priceInputElement.min = typeToMinPrice[typeInputElement.value];

  if (priceInputElement.value) {
    adFormPristine.validate(priceInputElement);
  }
};

const updateAddressInputValue = (coordinate) => {
  addressInputElement.value = getLatLngString(coordinate);
};

const setFormEvents = () => {
  checkTimeContainerElement.addEventListener('change', (evt) => {
    evt.stopPropagation();
    idToElement[evt.target.id].value = evt.target.value;
  });

  capacityELement.addEventListener('change', () => {
    adFormPristine.validate(roomNumberElement);
  });

  typeInputElement.addEventListener('change', () => {
    updatePriceFieldAttributes();
    updateSlider(priceInputElement);
  });

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (adFormPristine.validate()) {
      adFormElement.submit();
    }
  });
};

const setInitialFormState = () => {
  toggleFormsDisebledState();
  updatePriceFieldAttributes();
  setSlider(priceInputElement, adFormPristine);
  setFormEvents();
};

export { setInitialFormState, toggleFormsDisebledState, updateAddressInputValue };
