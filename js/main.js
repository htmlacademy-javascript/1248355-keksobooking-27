import { setInitialFormState, updateAddressInputValue, toggleAdFormDisebledState, toggleFiltersDisebledState, setFormEventListeners } from './form.js';
import { map, defaultCoordinate, renderMarkers, setMainMarkerDrag, getMarkerCoordinate, resetMap } from './map.js';
import { adFormPristine } from './pristine-setup.js';
import { getData } from './api.js';
import { showAlert } from './dom-util.js';

setInitialFormState(adFormPristine);
setFormEventListeners(adFormPristine, getMarkerCoordinate, resetMap);

map.on('load', () => {
  toggleAdFormDisebledState();
  setMainMarkerDrag(updateAddressInputValue);
  getData(
    (data) => {
      renderMarkers(data.slice(0, 10));
      toggleFiltersDisebledState();
    },
    (error) => {
      showAlert(error, map.getContainer());
    });
})
  .setView(defaultCoordinate, 10);
