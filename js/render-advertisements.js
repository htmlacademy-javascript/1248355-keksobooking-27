import { generateData } from './mock-data.js';
import { hideElement } from './util.js';

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
  FEATURES: '.popup__features',
  DESCRIPTION: '.popup__description',
  PHOTOS: '.popup__photos',
  PHOTO: '.popup__photo',
};
const typesMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const adsContainerElement = document.querySelector(QuerySelector.ADS_CONTAINER);
const adTemplateElement = document.querySelector(QuerySelector.ADS_TEMPLATE).content.querySelector(QuerySelector.AD);

const generateSimilarAdvertismentsFragment = (adData) => {
  const fragment = document.createDocumentFragment();

  adData.forEach((data) => {
    const adElement = adTemplateElement.cloneNode(true);
    const titleElement = adElement.querySelector(QuerySelector.TITLE);
    const avatarElement = adElement.querySelector(QuerySelector.AVATAR);
    const addressElement = adElement.querySelector(QuerySelector.ADDRESS);
    const priceElement = adElement.querySelector(QuerySelector.PRICE);
    const typeElement = adElement.querySelector(QuerySelector.TYPE);
    const capasityElement = adElement.querySelector(QuerySelector.CAPASITY);
    const timeElement = adElement.querySelector(QuerySelector.TIME);
    const featuresContainerElement = adElement.querySelector(QuerySelector.FEATURES);
    const featureElements = featuresContainerElement.querySelectorAll(QuerySelector.FEATURE);
    const descriptionElement = adElement.querySelector(QuerySelector.DESCRIPTION);
    const photosContainerElement = adElement.querySelector(QuerySelector.PHOTOS);

    avatarElement.src = data.author.avatar || hideElement(avatarElement);
    titleElement.textContent = data.offer.title || hideElement(titleElement);
    addressElement.textContent = data.offer.address || hideElement(addressElement);
    priceElement.textContent = `${data.offer.price || hideElement(priceElement)} ₽/ночь`;
    typeElement.textContent = typesMap[data.offer.type] || hideElement(typeElement);
    capasityElement.textContent = `${data.offer.rooms || hideElement(capasityElement)} комнаты для ${data.offer.guests || hideElement(capasityElement)} гостей`;
    timeElement.textContent = `Заезд после ${data.offer.checkin || hideElement(timeElement)}, выезд до ${data.offer.checkout || hideElement(timeElement)}`;
    descriptionElement.textContent = data.offer.description || hideElement(descriptionElement);

    // Блок генерации фоток
    if (!data.offer.photos) {
      hideElement(photosContainerElement);
    } else {
      data.offer.photos.forEach((photo, index) => {
        const photoElement = photosContainerElement.querySelector(QuerySelector.PHOTO).cloneNode(true);
        photoElement.src = photo;

        if (index === 0) {
          photosContainerElement.innerHTML = '';
        }

        photosContainerElement.append(photoElement);
      });
    }

    // Блок генерации удобств
    featureElements.forEach((featureElement) => {
      if (!data.offer.features) {
        hideElement(featuresContainerElement);
        return;
      }

      const isFeatureElement = data.offer.features.some((feature) => {
        const modifer = `${QuerySelector.FEATURE}--${feature}`.slice(1);
        return featureElement.classList.contains(modifer);
      });

      if (!isFeatureElement) {
        featureElement.remove();
      }
    });

    fragment.append(adElement);
  });

  return fragment;
};

adsContainerElement.append(generateSimilarAdvertismentsFragment(generateData(1)));
