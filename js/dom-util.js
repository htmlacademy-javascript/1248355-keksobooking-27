const ALERT_SHOW_TIME = 5000;

const QuerySelector = {
  CLASS_NAME: {
    ADS_CONTAINER: '.map__canvas',
    ADS_TEMPLATE: '#card',
    AD_FORM: '.ad-form',
    POPUP_AD: '.popup',
    POPUP_AVATAR: '.popup__avatar',
    POPUP_TITLE: '.popup__title',
    POPUP_ADDRESS: '.popup__text--address',
    POPUP_PRICE: '.popup__text--price',
    POPUP_TYPE: '.popup__type',
    POPUP_CAPASITY: '.popup__text--capacity',
    POPUP_TIME: '.popup__text--time',
    POPUP_FEATURE: '.popup__feature',
    POPUP_PHOTO: '.popup__photo',
    POPUP_DESCRIPTION: '.popup__description',
    POPUP_FEATURE_CONTAINER: '.popup__features',
    POPUP_PHOTO_CONTAINER: '.popup__photos',
    MAP_FILTERS: '.map__filters',
    MAP_FILTER: '.map__filter',
    MAP_FEATURES: '.map__features',
    MAP_CHECKBOX_FILTER: '.map__checkbox',
    CHECK_TIME_CONTAINER: '.ad-form__element--time',
    SLIDER: '.ad-form__slider',
    SUCCESS: '.success',
    ERROR: '.error',
    RESET_BTN: '.ad-form__reset',
    SUBMIT_BTN: '.ad-form__submit',
    AVATAR_IMG: '.ad-form-header__preview img',
    PHOTO_PREVIEW_CONTAINER: '.ad-form__photo'
  },
  TAG_NAME: {
    FIELDSET: 'fieldset',
    SPAN: 'span'
  },
  ID: {
    TITLE: '#title',
    PRICE: '#price',
    ADDRESS: '#address',
    ROOM_NUMBER: '#room_number',
    CAPASITY: '#capacity',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    SUCCESS: '#success',
    ERROR: '#error',
    AVATAR: '#avatar',
    PHOTO: '#images'
  }
};
const ClassModifier = {
  HIDDEN: 'hidden',
  DISABLED: 'disabled'
};

const toggleClass = (element, className) => element.classList.toggle(className);

const createClassName = (querySelector, modifer) => modifer
  ? `${querySelector}--${modifer}`.slice(1)
  : `${querySelector}`.slice(1);

const toggleDisabledState = (elements) => {
  if (elements.length && elements.length > 0) {
    elements.forEach((element) => {
      element.disabled = !element.disabled;
    });
  } else {
    elements.disabled = !elements.disabled;
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message, container) => {
  const alertContainerElement = document.createElement('div');

  alertContainerElement.style.zIndex = '1000';
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.padding = '15px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';

  alertContainerElement.textContent = message;

  container.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export { toggleClass, createClassName, toggleDisabledState, isEscapeKey, showAlert, ClassModifier, QuerySelector };
