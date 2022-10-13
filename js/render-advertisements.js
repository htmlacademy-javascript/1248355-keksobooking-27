import { generateData } from './mock-data.js';
import { toggleClass, QuerySelector, ClassModifier, createClassName } from './dom-util.js';

const typeToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const addPhotos = (urls, container) => {
  if (!urls) {
    toggleClass(container, ClassModifier.HIDDEN);
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
    toggleClass(container, ClassModifier.HIDDEN);
    return;
  }

  const featureElements = container.querySelectorAll(QuerySelector.FEATURE);
  featureElements.forEach((featureElement) => {
    const isFeatureElement = data.some((dataElement) => {
      const modifer = createClassName(QuerySelector.FEATURE, dataElement);
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

  avatarElement.src = data.author.avatar || toggleClass(avatarElement, ClassModifier.HIDDEN);
  titleElement.textContent = data.offer.title || toggleClass(titleElement, ClassModifier.HIDDEN);
  addressElement.textContent = data.offer.address || toggleClass(addressElement, ClassModifier.HIDDEN);
  priceElement.textContent = `${data.offer.price || toggleClass(priceElement, ClassModifier.HIDDEN)} ₽/ночь`;
  typeElement.textContent = typeToRus[data.offer.type] || toggleClass(typeElement, ClassModifier.HIDDEN);
  descriptionElement.textContent = data.offer.description || toggleClass(descriptionElement, ClassModifier.HIDDEN);

  capasityElement.textContent = data.offer.rooms && data.offer.guests
    ? `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`
    : toggleClass(capasityElement, ClassModifier.HIDDEN);

  timeElement.textContent = data.offer.checkin && data.offer.checkout
    ? `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`
    : toggleClass(timeElement, ClassModifier.HIDDEN);


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
