import { generateAdvertisements } from './generate-advertisements.js';
import { hideElement } from './util.js';

const QuerySelectors = {
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

const adsContainerElement = document.querySelector(QuerySelectors.ADS_CONTAINER);
const adTemplateElement = document.querySelector(QuerySelectors.ADS_TEMPLATE).content.querySelector(QuerySelectors.AD);

const generateSimilarAdvertismentsFragment = (adData) => {
  const fragment = document.createDocumentFragment();

  adData.forEach((data) => {
    const adElement = adTemplateElement.cloneNode(true);
    const titleElement = adElement.querySelector(QuerySelectors.TITLE);
    const avatarElement = adElement.querySelector(QuerySelectors.AVATAR);
    const addressElement = adElement.querySelector(QuerySelectors.ADDRESS);
    const priceElement = adElement.querySelector(QuerySelectors.PRICE);
    const typeElement = adElement.querySelector(QuerySelectors.TYPE);
    const capasityElement = adElement.querySelector(QuerySelectors.CAPASITY);
    const timeElement = adElement.querySelector(QuerySelectors.TIME);
    const featureElements = adElement.querySelectorAll(QuerySelectors.FEATURE);
    const featuresContainerElement = adElement.querySelector(QuerySelectors.FEATURES);
    const descriptionElement = adElement.querySelector(QuerySelectors.DESCRIPTION);
    const photosContainerElement = adElement.querySelector(QuerySelectors.PHOTOS);

    avatarElement.src = data.author.avatar || hideElement(avatarElement);
    titleElement.textContent = data.offer.title || hideElement(titleElement);
    addressElement.textContent = data.offer.address || hideElement(addressElement);
    priceElement.textContent = `${data.offer.price} ₽/ночь` || hideElement(priceElement);
    typeElement.textContent = typesMap[data.offer.type] || hideElement(typeElement);
    capasityElement.textContent = `${data.offer.rooms || hideElement(capasityElement)} комнаты для ${data.offer.guests || hideElement(capasityElement)} гостей`;
    timeElement.textContent = `Заезд после ${data.offer.checkin || hideElement(timeElement)}, выезд до ${data.offer.checkout || hideElement(timeElement)}`;
    descriptionElement.textContent = data.offer.description || hideElement(descriptionElement);

    // Блок генерации фоток
    if (!data.offer.photos) {
      hideElement(photosContainerElement);
    }

    data.offer.photos?.forEach((photo, index) => {
      const photoElement = photosContainerElement.querySelector(QuerySelectors.PHOTO).cloneNode(true);
      photoElement.src = photo;

      if (index === 0) {
        photosContainerElement.innerHTML = '';
      }

      photosContainerElement.append(photoElement);
    });

    // Блок генерации удобств
    featureElements.forEach((featureElement) => {
      if (!data.offer.features) {
        hideElement(featuresContainerElement);
        return;
      }

      const isFeatureElement = data.offer.features.some((feature) => {
        const modifer = `${QuerySelectors.FEATURE}--${feature}`.slice(1);
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


adsContainerElement.append(generateSimilarAdvertismentsFragment(generateAdvertisements()).firstChild);
