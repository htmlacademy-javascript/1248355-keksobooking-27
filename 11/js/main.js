import { setInitialFormState, updateAddressInputValue, toggleAdFormDisebledState, setFormEventListeners } from './form.js';
import { map, defaultCoordinate, renderMarkers, setMainMarkerDrag, getMarkerCoordinate, resetMap } from './map.js';
import { toggleFiltersDisebledState, setFilterFormEventListeners } from './filter.js';
import { adFormPristine } from './pristine-setup.js';
import { getData } from './api.js';
import { showAlert } from './dom-util.js';
import { debounce } from './util.js';

const DEBOUNCE_DELAY = 500;

setInitialFormState(adFormPristine);
toggleFiltersDisebledState();
setFormEventListeners(adFormPristine, getMarkerCoordinate, resetMap);

map.on('load', () => {
  toggleAdFormDisebledState();
  setMainMarkerDrag(updateAddressInputValue);
  getData(
    (data) => {
      renderMarkers(data);
      setFilterFormEventListeners(debounce(renderMarkers, DEBOUNCE_DELAY), data);
      toggleFiltersDisebledState();
    },
    (error) => {
      showAlert(error, map.getContainer());
    });
})
  .setView(defaultCoordinate, 10);
