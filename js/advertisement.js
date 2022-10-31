import { toggleClass, QuerySelector, ClassModifier, createClassName } from './dom-util.js';
import { translateNumberToWord } from './util.js';

const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];

const typeToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const adTemplateElement = document.querySelector(QuerySelector.CLASS_NAME.ADS_TEMPLATE).content.querySelector(QuerySelector.CLASS_NAME.POPUP_AD);

const addPhotos = (urls, container) => {
  if (!urls || !urls.length) {
    toggleClass(container, ClassModifier.HIDDEN);
    return;
  }

  urls.forEach((url, index) => {
    const photoElement = container.querySelector(QuerySelector.CLASS_NAME.POPUP_PHOTO).cloneNode(true);
    photoElement.src = url;

    if (index === 0) {
      container.innerHTML = '';
    }

    container.append(photoElement);
  });
};

const filterFeatures = (filters, container) => {
  if (!filters || !filters.length) {
    toggleClass(container, ClassModifier.HIDDEN);
    return;
  }

  const featureElements = container.querySelectorAll(QuerySelector.CLASS_NAME.POPUP_FEATURE);

  featureElements.forEach((featureElement) => {
    const isFeatureElement = filters.some((filter) => {
      const className = createClassName(QuerySelector.CLASS_NAME.POPUP_FEATURE, filter);
      return featureElement.classList.contains(className);
    });

    if (!isFeatureElement) {
      featureElement.remove();
    }
  });
};

const addPrice = (price, priceElement) => {
  const priceSpanElement = priceElement.querySelector(QuerySelector.TAG_NAME.SPAN);
  priceElement.textContent = `${price} `;
  priceElement.append(priceSpanElement);
};

const createAdElement = (data) => {
  const adElement = adTemplateElement.cloneNode(true);
  const titleElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_TITLE);
  const avatarElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_AVATAR);
  const addressElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_ADDRESS);
  const priceElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_PRICE);
  const typeElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_TYPE);
  const capasityElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_CAPASITY);
  const timeElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_TIME);
  const featuresContainerElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_FEATURE_CONTAINER);
  const descriptionElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_DESCRIPTION);
  const photosContainerElement = adElement.querySelector(QuerySelector.CLASS_NAME.POPUP_PHOTO_CONTAINER);

  avatarElement.src = data.author.avatar || toggleClass(avatarElement, ClassModifier.HIDDEN);
  descriptionElement.textContent = data.offer.description || toggleClass(descriptionElement, ClassModifier.HIDDEN);
  typeElement.textContent = typeToRus[data.offer.type];
  titleElement.textContent = data.offer.title;
  addressElement.textContent = data.offer.address;
  capasityElement.textContent = `${data.offer.rooms} ${translateNumberToWord(data.offer.rooms, ROOM_WORDS)} для ${data.offer.guests} ${translateNumberToWord(data.offer.guests, GUEST_WORDS)}`;
  timeElement.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  addPhotos(data.offer.photos, photosContainerElement);
  addPrice(data.offer.price, priceElement);
  filterFeatures(data.offer.features, featuresContainerElement);

  return adElement;
};

export { createAdElement };
