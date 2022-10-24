import { createAdElement } from './advertisement.js';

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

// Возможно переделаю эту fn в 12 модуле, так как сейчас не понимаю как будут использоваться группы в в фильтрации
const makeMarkerRender = (markersGroup) => (data) => {
  data.forEach(({ location, ...rest }) => {
    const adMarker = createMarker(location, Icon.AD);
    adMarker
      .addTo(markersGroup)
      .bindPopup(createAdElement(rest));
  });
};

const map = createMapInstance('map-canvas');
const mainMarker = createMarker(defaultCoordinate, Icon.MAIN, true).addTo(map);
const adMarkerGroup = createMarkerGroup().addTo(map);
const renderMarkers = makeMarkerRender(adMarkerGroup);

const getMarkerCoordinate = () => mainMarker.getLatLng();

const setMarkerCoordinate = (coordinate = defaultCoordinate) => mainMarker.setLatLng(coordinate);

const setMapView = (coordinate = defaultCoordinate) => map.setView(coordinate, 10);

const closeBalloon = () => map.closePopup();

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
