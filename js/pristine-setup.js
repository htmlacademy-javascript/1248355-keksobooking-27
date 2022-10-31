import { QuerySelector } from './dom-util.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityInputElement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomQuantityInputElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);

const adFormConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
};

const getRequiredMessage = () => 'Это поле обязательно для заполнения';

const adFormValidatorData = {
  titleField: {
    minLength: 30,
    maxLength: 100,
    element: adFormElement.querySelector(QuerySelector.ID.TITLE),
    validationHandler: function (value) {
      return value.trim() && this.minLength <= value.length && value.length <= this.maxLength;
    },
    messageHandler: function (value) {
      if (!value.trim()) {
        return getRequiredMessage();
      }

      return `Объявление должно быть минимум ${this.minLength} максимум ${this.maxLength} символов. Введено:${value.length}`;
    },
  },
  priceField: {
    minPrice: 0,
    maxPrice: 100000,
    element: adFormElement.querySelector(QuerySelector.ID.PRICE),
    validationHandler: function (value) {
      this.minPrice = +this.element.min;
      return value && this.minPrice <= +this.element.value && +this.element.value <= this.maxPrice;
    },
    messageHandler: function (value) {
      if (!value) {
        return getRequiredMessage();
      }

      return `Введите цену от ${this.minPrice} до ${this.maxPrice} руб`;
    },
  },
  roomQuantityField: {
    element: roomQuantityInputElement,
    connectedElement: capacityInputElement,
    roomsToMessage: {
      1: '«для 1 гостя»',
      2: '«для 2 гостей» или «для 1 гостя»',
      3: '«для 3, 2 гостей» или «для 1 гостя»',
      100: '«не для гостей»',
    },
    validationHandler: function (value) {
      // Выбрано 100 комнат и любое кол-во гостей кроме не для гостей
      if (+value === 100 && +this.connectedElement.value !== 0) {
        return false;
      }

      // Выбрано не для гостей и любое кол-во комнат кроме 100
      if (!+this.connectedElement.value && +value !== 100) {
        return false;
      }

      // Оcтальные случаи
      return +value >= +this.connectedElement.value;
    },
    messageHandler: function (value) {
      return `${this.roomsToMessage[value]}`;
    },
  },
  guestsField: {
    element: capacityInputElement,
    connectedElement: roomQuantityInputElement,
    guestsToMessage: {
      0: '«выберите 100 комнат»',
      1: '«выберите 1, 2 или 3 комнаты»',
      2: '«выберите 2 или 3 комнаты»',
      3: '«выберите 3 комнаты»',
    },
    validationHandler: function () {
      return this.connectedElement.parentElement.classList.contains('has-success');
    },
    messageHandler: function (value) {
      return `${this.guestsToMessage[value]}`;
    }
  }
};

const createPristine = (validatorData, form, config) => {
  const pristine = new Pristine(form, config);

  Object.values(validatorData).forEach(({ validationHandler, messageHandler, ...rest }) => {
    pristine.addValidator(rest.element, validationHandler.bind(rest), messageHandler.bind(rest), 100, true);
  });

  return pristine;
};

const adFormPristine = createPristine(adFormValidatorData, adFormElement, adFormConfig);

export { adFormPristine };
