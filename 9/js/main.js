import { toggleFormsDisebledState, updatePriceFieldAttributes, updateSlider } from './form.js';
import { map, defaultCoordinate, renderMarkers } from './map.js';
import { generateData } from './mock-data.js';

window.addEventListener('DOMContentLoaded', () => toggleFormsDisebledState());

map.on('load', () => {
  toggleFormsDisebledState();
  renderMarkers(generateData());
  updatePriceFieldAttributes();
  updateSlider();
})
  .setView(defaultCoordinate, 10);
