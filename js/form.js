import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { adFormPrestine } from './pristine-setup.js';

const adFormElement = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
const capacityELement = adFormElement.querySelector(QuerySelector.ID.CAPASITY);
const roomNumberElement = adFormElement.querySelector(QuerySelector.ID.ROOM_NUMBER);


const toggleFormsDisebledState = () => {
  const adForm = document.querySelector(QuerySelector.CLASS_NAME.AD_FORM);
  const adFormfieldsets = adForm.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);
  const mapForm = document.querySelector(QuerySelector.CLASS_NAME.MAP_FORM);
  const mapFormElements = mapForm.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
  const mapFormfieldsets = mapForm.querySelectorAll(QuerySelector.TAG_NAME.FIELDSET);

  toggleDisabledState(adFormfieldsets);
  toggleDisabledState(mapFormElements);
  toggleDisabledState(mapFormfieldsets);
  toggleClass(adForm, createClassName(QuerySelector.CLASS_NAME.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapForm, createClassName(QuerySelector.CLASS_NAME.MAP_FORM, ClassModifier.DISABLED));
};

capacityELement.addEventListener('change', () => {
  adFormPrestine.validate(roomNumberElement);
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (adFormPrestine.validate()) {
    adFormElement.submit();
  }

});


export { toggleFormsDisebledState };
