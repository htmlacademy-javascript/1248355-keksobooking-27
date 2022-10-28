import { createAdElement } from './advertisement.js';

const NUMBER_OF_ADVERTISEMENTS = 10;

const TokyoCoordinate = {
  LAT: 35.65283,
  LNG: 139.83947
};
const Icon = {
  MAIN: L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }),
  AD: L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }),
};

const defaultCoordinate = {
  lat: TokyoCoordinate.LAT,
  lng: TokyoCoordinate.LNG
};

const createMapInstance = (mapId) => {
  const mapInstance = L.map(mapId);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapInstance);

  return mapInstance;
};

const createMarker = ({ lat, lng }, icon, draggable = false) => {
  const marker = L.marker({
    lat,
    lng
  },
  {
    icon: icon,
    draggable
  }
  );

  return marker;
};

const createMarkerGroup = () => L.layerGroup();

const map = createMapInstance('map-canvas');
const mainMarker = createMarker(defaultCoordinate, Icon.MAIN, true).addTo(map);
const adMarkerGroup = createMarkerGroup().addTo(map);

const getMarkerCoordinate = () => mainMarker.getLatLng();

const setMarkerCoordinate = (coordinate = defaultCoordinate) => mainMarker.setLatLng(coordinate);

const setMapView = (coordinate = defaultCoordinate) => map.setView(coordinate, 10);

const deleteBalloons = () => adMarkerGroup.clearLayers();

const closeBalloon = () => map.closePopup();

const renderMarkers = (data) => {
  deleteBalloons();

  data.slice(0, NUMBER_OF_ADVERTISEMENTS).forEach(({ location, ...rest }) => {
    const adMarker = createMarker(location, Icon.AD);
    adMarker
      .addTo(adMarkerGroup)
      .bindPopup(createAdElement(rest));
  });
};

const resetMap = () => {
  setMarkerCoordinate();
  setMapView();
  closeBalloon();
};

const setMainMarkerDrag = (cb) => {
  cb(getMarkerCoordinate());
  mainMarker.on('moveend', () => {
    cb(getMarkerCoordinate());
  });
};

export { map, defaultCoordinate, renderMarkers, setMainMarkerDrag, getMarkerCoordinate, resetMap };
