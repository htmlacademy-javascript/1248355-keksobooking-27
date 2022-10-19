import { setInitialFormState, toggleFormsDisebledState, addFormListeners } from './form.js';
import { map, defaultCoordinate, renderMarkers, addMapListeners, updateAddressInputValue } from './map.js';
import { generateData } from './mock-data.js';
import { addSliderListeners, updateSlider } from './slider.js';

window.addEventListener('DOMContentLoaded', () => toggleFormsDisebledState());

map.on('load', () => {
  renderMarkers(generateData());
  updateAddressInputValue();
  setInitialFormState();
  updateSlider();
  addMapListeners();
  addFormListeners();
  addSliderListeners();
})
  .setView(defaultCoordinate, 10);
