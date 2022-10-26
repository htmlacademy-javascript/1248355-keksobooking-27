import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { setSlider, updateSlider, resetSlider, setInputValueToSlider } from './slider.js';
import { getLatLngString } from './util.js';
import { sendData } from './api.js';
import { showModal } from './form-modal.js';

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
const resetBtnElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.RESET_BTN);
const submitBtnElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.SUBMIT_BTN);

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

const toggleFiltersDisebledState = () => {
  toggleDisabledState(mapFormsElements);
  toggleDisabledState(mapFormsFieldsetElements);
  toggleClass(mapFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

const toggleAdFormDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
};

const updatePriceFieldAttributes = (pristine, isReset = false) => {
  priceInputElement.placeholder = typeToMinPrice[typeInputElement.value];
  priceInputElement.min = typeToMinPrice[typeInputElement.value];
  if (isReset) {
    pristine.reset();
    return;
  }
  if (priceInputElement.value) {
    pristine.validate(priceInputElement);
  }
};

const updateAddressInputValue = (coordinate) => {
  addressInputElement.value = getLatLngString(coordinate);
};

const setCheckTimeChange = () => {
  checkTimeContainerElement.addEventListener('change', (evt) => {
    evt.stopPropagation();
    idToElement[evt.target.id].value = evt.target.value;
  });
};

const setCapasityChange = (pristine) => {
  capacityELement.addEventListener('change', () => {
    pristine.validate(roomNumberElement);
  });
};

const setTypeChange = (pristine) => {
  typeInputElement.addEventListener('change', () => {
    updatePriceFieldAttributes(pristine);
    updateSlider(priceInputElement);
  });
};

const setPriceChange = () => {
  priceInputElement.addEventListener('change', (evt) => setInputValueToSlider(evt.target));
};


const setFormReset = (pristine, getCoordinate, resetMap) => {
  resetBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFormElement.reset();
    mapFormElement.reset();
    updatePriceFieldAttributes(pristine, true);
    resetSlider(priceInputElement);
    resetMap();
    updateAddressInputValue(getCoordinate());
  });
};

const setFormSubmit = (pristine) => {
  submitBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      toggleDisabledState(evt.target);
      sendData(
        () => {
          resetBtnElement.click();
          toggleDisabledState(evt.target);
          showModal('success');
        },
        () => {
          toggleDisabledState(evt.target);
          showModal('error');
        },
        new FormData(adFormElement)
      );
    }
  });
};

const setFormEventListeners = (pristine, getCoordinate, resetMap) => {
  setFormSubmit(pristine);
  setTypeChange(pristine);
  setCapasityChange(pristine);
  setCheckTimeChange();
  setPriceChange();
  setFormReset(pristine, getCoordinate, resetMap);
  setSlider(priceInputElement, pristine);
};

const setInitialFormState = (pristine) => {
  toggleAdFormDisebledState();
  toggleFiltersDisebledState();
  updatePriceFieldAttributes(pristine);
};

export { setInitialFormState, toggleAdFormDisebledState, toggleFiltersDisebledState, updateAddressInputValue, setFormEventListeners };
