const QuerySelector = {
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
  MAP_FILTERS: '.map__filters'
};

const ClassModifier = {
  HIDDEN: 'hidden',
  DISABLED: 'disabled'
};

const toggleClass = (element, className) => element.classList.toggle(className);

const createClassName = (querySelector, modifer) => modifer
  ? `${querySelector}--${modifer}`.slice(1)
  : `${querySelector}`.slice(1);

export {
  toggleClass,
  createClassName,
  ClassModifier,
  QuerySelector
};
