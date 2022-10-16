import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { adFormPristine } from './pristine-setup.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityELement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomNumberElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);
const adFormsfieldsetElements = adFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
const mapFormElement = document.querySelector(QuerySelector.CLASS_NAME.MAP_FORM);
const mapFormsElements = mapFormElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
const mapFormsFieldsetElements = mapFormElement.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);

const toggleFormsDisebledState = () => {
  toggleDisabledState(adFormsfieldsetElements);
  toggleDisabledState(mapFormsElements);
  toggleDisabledState(mapFormsFieldsetElements);
  toggleClass(adFormElement, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

capacityELement.addEventListener('change', () => {
  adFormPristine.validate(roomNumberElement);
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (adFormPristine.validate()) {
    adFormElement.submit();
  }

});

export { toggleFormsDisebledState };
