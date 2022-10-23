import { setInitialFormState, toggleFormsDisebledState, updateAddressInputValue } from './form.js';
import { map, defaultCoordinate, renderMarkers, setMainMarkerDragEvent } from './map.js';
import { generateData } from './mock-data.js';
import { adFormPristine } from './pristine-setup.js';

window.addEventListener('DOMContentLoaded', () => toggleFormsDisebledState());

map.on('load', () => {
  renderMarkers(generateData());
  setInitialFormState(adFormPristine);
  setMainMarkerDragEvent(updateAddressInputValue);

})
  .setView(defaultCoordinate, 10);
