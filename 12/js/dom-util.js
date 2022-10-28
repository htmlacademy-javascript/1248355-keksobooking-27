const ALERT_SHOW_TIME = 5000;

const QuerySelector = {
  CLASS_NAME: {
    ADS_CONTAINER: '.map__canvas',
    ADS_TEMPLATE: '#card',
    AD: '.popup',
    AVATAR: '.popup__avatar',
    TITLE: '.popup__title',
    ADDRESS: '.popup__text--address',
    PRICE: '.popup__text--price',
    TYPE: '.popup__type',
    CAPASITY: '.popup__text--capacity',
    TIME: '.popup__text--time',
    FEATURE: '.popup__feature',
    FEATURE_CONTAINER: '.popup__features',
    DESCRIPTION: '.popup__description',
    PHOTO_CONTAINER: '.popup__photos',
    PHOTO: '.popup__photo',
    AD_FORM: '.ad-form',
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
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '15px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  container.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { toggleClass, createClassName, toggleDisabledState, isEscapeKey, showAlert, ClassModifier, QuerySelector };
