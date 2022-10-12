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
};

const toggleClassHidden = (element) => element.classList.toggle('hidden');


export {
  toggleClassHidden,
  QuerySelector
};
