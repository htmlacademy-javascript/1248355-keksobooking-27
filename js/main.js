import { setInitialFormState, toggleFormsDisebledState, updateAddressInputValue } from './form.js';
import { map, defaultCoordinate, renderMarkers, setMainMarkerDragEvent } from './map.js';
import { generateData } from './mock-data.js';

window.addEventListener('DOMContentLoaded', () => toggleFormsDisebledState());

map.on('load', () => {
  renderMarkers(generateData());
  setInitialFormState();
  setMainMarkerDragEvent(updateAddressInputValue);

})
  .setView(defaultCoordinate, 10);
