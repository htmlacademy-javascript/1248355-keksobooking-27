import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';

const filtersFormElement = document.querySelector(QuerySelector.CLASS_NAME.MAP_FILTERS);
const filterElements = filtersFormElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
const featuresFilterContainerElement = filtersFormElement.querySelector(QuerySelector.TAG_NAME.FIELDSET);
const featureFilterElements = featuresFilterContainerElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_CHECKBOX_FILTER);
const resetBtnElement = document.querySelector(QuerySelector.CLASS_NAME.RESET_BTN);

const priceTypeToValue = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 100000
  },
};

const toggleFiltersDisebledState = () => {
  toggleDisabledState(filterElements);
  toggleDisabledState(featuresFilterContainerElement);
  toggleClass(filtersFormElement, createClassName(QuerySelector.CLASS_NAME.MAP_FILTERS, ClassModifier.DISABLED));
};

const getDataKey = (inputName) => inputName.slice(inputName.indexOf('-') + 1);

const isPriceInRange = (price, priceType) => priceTypeToValue[priceType].min <= price && price <= priceTypeToValue[priceType].max;

const findCheckedFeatures = () => {
  const checkedElements = [];

  featureFilterElements.forEach((filterElement) => {
    if (filterElement.checked) {
      checkedElements.push(filterElement);
    }
  });

  return checkedElements;
};

const isPickedFilterValueInData = (filterElement, data) => {
  const key = getDataKey(filterElement.name);

  switch (key) {
    case 'price':
      return isPriceInRange(data[key], filterElement.value);
    case 'type':
      return data[key] === filterElement.value;
    default:
      return data[key] === +filterElement.value;
  }
};

const applyCheckboxFilters = (data) => {
  const checkedFilterElements = findCheckedFeatures();

  if (!checkedFilterElements.length) {
    return data;
  }

  return data.filter(({ offer: { features } }) => {
    if (features) {
      return checkedFilterElements.every((filterElement) => features.includes(filterElement.value));
    }
  });
};

const applySelectFilters = (data) => data.filter(({ offer }) => {
  let coincidenceCount = 0;
  let unusedFiltersCount = 0;

  filterElements.forEach((filterElement) => {
    if (filterElement.value === 'any') {
      unusedFiltersCount++;
      return;
    }

    if (isPickedFilterValueInData(filterElement, offer)) {
      coincidenceCount++;
    }
  });

  if (filterElements.length - unusedFiltersCount === coincidenceCount) {
    return true;
  }
});

const filterData = (data) => applyCheckboxFilters(applySelectFilters(data));

const setFiltersChange = (cb, data) => {
  filtersFormElement.addEventListener('change', () => {
    cb(filterData(data));
  });
};

const setFiltersReset = (cb, data) => {
  resetBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    filtersFormElement.reset();
    cb(data);
  });
};

const setFilterFormEventListeners = (cb, data) => {
  setFiltersChange(cb, data);
  setFiltersReset(cb, data);
};

export { toggleFiltersDisebledState, setFilterFormEventListeners };
