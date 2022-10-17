import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { adFormPristine } from './pristine-setup.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityELement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomNumberElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);
const typeFieldElement = adFormElement.querySelector(QuerySelector.ID.TYPE);
const priceFieldElement = adFormElement.querySelector(QuerySelector.ID.PRICE);
const timeinFieldElement = adFormElement.querySelector(QuerySelector.ID.TIMEIN);
const timeoutFieldElement = adFormElement.querySelector(QuerySelector.ID.TIMEOUT);
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
  hotel: ' 3000'
};
const idToElement = {
  'timein': timeoutFieldElement,
  'timeout': timeinFieldElement
};

const toggleFormsDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleDisabledState(mapFormsElements);
  toggleDisabledState(mapFormsFieldsetElements);
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

checkTimeContainerElement.addEventListener('change', (evt) => {
  evt.stopPropagation();
  idToElement[evt.target.id].value = evt.target.value;
});

capacityELement.addEventListener('change', () => {
  adFormPristine.validate(roomNumberElement);
});

typeFieldElement.addEventListener('change', (evt) => {
  priceFieldElement.placeholder = typeToMinPrice[evt.target.value];
  priceFieldElement.min = typeToMinPrice[evt.target.value];

  if (priceFieldElement.value) {
    adFormPristine.validate(priceFieldElement);
  }
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (adFormPristine.validate()) {
    adFormElement.submit();
  }
});

export { toggleFormsDisebledState };
