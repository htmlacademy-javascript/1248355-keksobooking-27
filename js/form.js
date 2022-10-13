import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';

const toggleFormsDisebledState = () => {
  const adForm = document.querySelector(QuerySelector.AD_FORM);
  const adFormfieldsets = adForm.querySelectorAll('fieldset');
  const mapForm = document.querySelector(QuerySelector.MAP_FORM);
  const mapFormElements = mapForm.querySelectorAll(QuerySelector.MAP_FILTER);
  const mapFormfieldsets = mapForm.querySelectorAll('fieldset');

  toggleDisabledState(adFormfieldsets);
  toggleDisabledState(mapFormElements);
  toggleDisabledState(mapFormfieldsets);
  toggleClass(adForm, createClassName(QuerySelector.AD_FORM, ClassModifier.DISABLED));
  toggleClass(mapForm, createClassName(QuerySelector.MAP_FORM, ClassModifier.DISABLED));
};

export { toggleFormsDisebledState };
