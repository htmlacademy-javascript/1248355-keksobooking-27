import { toggleClass, QuerySelector, ClassModifier, createClassName } from './dom-util.js';

const adTemplateElement = document.querySelector(QuerySelector.CLASS_NAME.ADS_TEMPLATE).content.querySelector(QuerySelector.CLASS_NAME.AD);

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
    const photoElement = container.querySelector(QuerySelector.CLASS_NAME.PHOTO).cloneNode(true);
    photoElement.src = url;

    if (index === 0) {
      container.innerHTML = '';
    }

    container.append(photoElement);
  });
};

const addFeatures = (modifiers, container) => {
  if (!modifiers) {
    toggleClass(container, ClassModifier.HIDDEN);
    return;
  }

  const featureElements = container.querySelectorAll(QuerySelector.CLASS_NAME.FEATURE);

  featureElements.forEach((featureElement) => {
    const isFeatureElement = modifiers.some((modifier) => {
      const className = createClassName(QuerySelector.CLASS_NAME.FEATURE, modifier);
      return featureElement.classList.contains(className);
    });

    if (!isFeatureElement) {
      featureElement.remove();
    }
  });
};

const createAdElement = (data) => {
  const adElement = adTemplateElement.cloneNode(true);
  const titleElement = adElement.querySelector(QuerySelector.CLASS_NAME.TITLE);
  const avatarElement = adElement.querySelector(QuerySelector.CLASS_NAME.AVATAR);
  const addressElement = adElement.querySelector(QuerySelector.CLASS_NAME.ADDRESS);
  const priceElement = adElement.querySelector(QuerySelector.CLASS_NAME.PRICE);
  const typeElement = adElement.querySelector(QuerySelector.CLASS_NAME.TYPE);
  const capasityElement = adElement.querySelector(QuerySelector.CLASS_NAME.CAPASITY);
  const timeElement = adElement.querySelector(QuerySelector.CLASS_NAME.TIME);
  const featuresContainerElement = adElement.querySelector(QuerySelector.CLASS_NAME.FEATURE_CONTAINER);
  const descriptionElement = adElement.querySelector(QuerySelector.CLASS_NAME.DESCRIPTION);
  const photosContainerElement = adElement.querySelector(QuerySelector.CLASS_NAME.PHOTO_CONTAINER);

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

export { createAdElement };
