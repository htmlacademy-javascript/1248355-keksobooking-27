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
    MAP_FORM: '.map__filters',
    MAP_FILTER: '.map__filter',
    MAP_FEATURES: '.map__features'
  },
  TAG_NAME: {
    FIELDSET: 'fieldset'
  },
  ID: {
    TITLE: '#title',
    PRICE: '#price',
    ADDRESS: '#address',
    ROOM_NUMBER: '#room_number',
    CAPASITY:'#capacity'
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

const toggleDisabledState = (elements) => elements.forEach((element) => {
  element.disabled = !element.disabled;
});

export { toggleClass, createClassName, toggleDisabledState, ClassModifier, QuerySelector };
