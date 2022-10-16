import { QuerySelector } from './dom-util.js';

const adForm = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);

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
    element: adForm.querySelector(QuerySelector.ID.TITLE),
    validator: function (value) {
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
    maxPrice: 100000,
    element: adForm.querySelector(QuerySelector.ID.PRICE),
    validator: function (value) {
      return +value && +value <= this.maxPrice;
    },
    messageHandler: function (value) {
      if (!value) {
        return getRequiredMessage();
      }

      return `Максимальная стоимость ${this.maxPrice} р`;
    },
  },
  addressField: {
    element: adForm.querySelector(QuerySelector.ID.ADDRESS),
    validator: function (value) {
      return Boolean(value);
    },
    messageHandler: function (value) {
      if (!value) {
        this.element.value = 'lat:35.70606, lng:139.75654';
        return 'Задайте координаты с помощью ползунка';
      }
    },
  },
  roomNumberField: {
    element: adForm.querySelector(QuerySelector.ID.ROOM_NUMBER),
    connectedElement: adForm.querySelector(QuerySelector.ID.CAPASITY),
    roomToMessage: {
      1: '«для 1 гостя»',
      2: '«для 2 гостей» или «для 1 гостя»',
      3: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»',
      100: '«не для гостей»',
    },
    validator: function (value) {
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
      return `${this.roomToMessage[value]}`;
    },
  }
};

const createPristine = (validatorData, form, config) => {
  const pristine = new Pristine(form, config);

  Object.values(validatorData).forEach(({ validator, messageHandler, ...rest }) => {
    pristine.addValidator(rest.element, validator.bind(rest), messageHandler.bind(rest), 100, true);
  });

  return pristine;
};

const adFormPrestine = createPristine(adFormValidatorData, adForm, adFormConfig);

export { adFormPrestine };
