import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { setSliderSlide, setSliderToMinValue, resetSlider, setInputValueToSlider, toggleSliderdisabledState } from './slider.js';
import { getLatLngString } from './util.js';
import { sendData } from './api.js';
import { showModal } from './form-modal.js';
import { setAvatarImgChange, setPhotoImgChange, clearImagesPreview } from './image.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityInputElement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomQuantityInputElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);
const typeInputElement = adFormElement.querySelector(QuerySelector.ID.TYPE);
const priceInputElement = adFormElement.querySelector(QuerySelector.ID.PRICE);
const timeinInputElement = adFormElement.querySelector(QuerySelector.ID.TIMEIN);
const timeoutInputElement = adFormElement.querySelector(QuerySelector.ID.TIMEOUT);
const addressInputElement = adFormElement.querySelector(QuerySelector.ID.ADDRESS);
const checkTimeContainerElement = adFormElement.querySelector(QuerySelector.CLASS_NAME.CHECK_TIME_CONTAINER);
const adFormsfieldsetElements = adFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
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
  capacityInputElement.addEventListener('change', () => {
    pristine.validate(roomQuantityInputElement);
    pristine.validate(capacityInputElement);
  });
};

const setRoomsChange = (pristine) => {
  roomQuantityInputElement.addEventListener('change', () => {
    pristine.validate(roomQuantityInputElement);
    pristine.validate(capacityInputElement);
  });
};

const setTypeChange = (pristine) => {
  typeInputElement.addEventListener('change', () => {
    updatePriceFieldAttributes(pristine);
    setSliderToMinValue(priceInputElement);
  });
};

const setPriceChange = () => {
  priceInputElement.addEventListener('change', (evt) => setInputValueToSlider(evt.target));
};

const setFormReset = (pristine, getCoordinate, resetMap) => {
  resetBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFormElement.reset();
    updatePriceFieldAttributes(pristine, true);
    resetSlider(priceInputElement);
    resetMap();
    clearImagesPreview();
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
  setRoomsChange(pristine);
  setCheckTimeChange();
  setPriceChange();
  setAvatarImgChange();
  setPhotoImgChange();
  setFormReset(pristine, getCoordinate, resetMap);
  setSliderSlide(priceInputElement, pristine);
};

const toggleAdFormDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleSliderdisabledState();
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
};

const setInitialFormState = (pristine) => {
  toggleAdFormDisebledState();
  updatePriceFieldAttributes(pristine);
};

export { setInitialFormState, toggleAdFormDisebledState, updateAddressInputValue, setFormEventListeners };
