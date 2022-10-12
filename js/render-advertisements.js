import { generateData } from './mock-data.js';
import { toggleClassHidden, QuerySelector } from './dom-util.js';

const typeToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const addPhotos = (urls, container) => {
  if (!urls) {
    toggleClassHidden(container);
    return;
  }

  urls.forEach((url, index) => {
    const photoElement = container.querySelector(QuerySelector.PHOTO).cloneNode(true);
    photoElement.src = url;

    if (index === 0) {
      container.innerHTML = '';
    }

    container.append(photoElement);
  });
};

const addFeatures = (data, container) => {
  if (!data) {
    toggleClassHidden(container);
    return;
  }

  const featureElements = container.querySelectorAll(QuerySelector.FEATURE);
  featureElements.forEach((featureElement) => {
    const isFeatureElement = data.some((dataElement) => {
      const modifer = `${QuerySelector.FEATURE}--${dataElement}`.slice(1);
      return featureElement.classList.contains(modifer);
    });

    if (!isFeatureElement) {
      featureElement.remove();
    }
  });
};

const createAdElement = (data) => {
  const adTemplateElement = document.querySelector(QuerySelector.ADS_TEMPLATE).content.querySelector(QuerySelector.AD);
  const adElement = adTemplateElement.cloneNode(true);
  const titleElement = adElement.querySelector(QuerySelector.TITLE);
  const avatarElement = adElement.querySelector(QuerySelector.AVATAR);
  const addressElement = adElement.querySelector(QuerySelector.ADDRESS);
  const priceElement = adElement.querySelector(QuerySelector.PRICE);
  const typeElement = adElement.querySelector(QuerySelector.TYPE);
  const capasityElement = adElement.querySelector(QuerySelector.CAPASITY);
  const timeElement = adElement.querySelector(QuerySelector.TIME);
  const featuresContainerElement = adElement.querySelector(QuerySelector.FEATURE_CONTAINER);
  const descriptionElement = adElement.querySelector(QuerySelector.DESCRIPTION);
  const photosContainerElement = adElement.querySelector(QuerySelector.PHOTO_CONTAINER);

  avatarElement.src = data.author.avatar || toggleClassHidden(avatarElement);
  titleElement.textContent = data.offer.title || toggleClassHidden(titleElement);
  addressElement.textContent = data.offer.address || toggleClassHidden(addressElement);
  priceElement.textContent = `${data.offer.price || toggleClassHidden(priceElement)} ₽/ночь`;
  typeElement.textContent = typeToRus[data.offer.type] || toggleClassHidden(typeElement);
  capasityElement.textContent = `${data.offer.rooms || toggleClassHidden(capasityElement)} комнаты для ${data.offer.guests || toggleClassHidden(capasityElement)} гостей`;
  timeElement.textContent = `Заезд после ${data.offer.checkin || toggleClassHidden(timeElement)}, выезд до ${data.offer.checkout || toggleClassHidden(timeElement)}`;
  descriptionElement.textContent = data.offer.description || toggleClassHidden(descriptionElement);

  addPhotos(data.offer.photos, photosContainerElement);
  addFeatures(data.offer.features, featuresContainerElement);

  return adElement;
};

const generateSimilarAdvertismentsFragment = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((dataElement) => fragment.append(createAdElement(dataElement)));

  return fragment;
};

const renderAdvertisements = (count) => {
  const adsContainerElement = document.querySelector(QuerySelector.ADS_CONTAINER);
  adsContainerElement.append(generateSimilarAdvertismentsFragment(generateData(count)));
};

export { renderAdvertisements };
