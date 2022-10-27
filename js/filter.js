import { QuerySelector, ClassModifier, createClassName, toggleClass, toggleDisabledState } from './dom-util.js';
import { resetBtnElement } from './form.js';

const filtersFormElement = document.querySelector(QuerySelector.CLASS_NAME.MAP_FILTERS);
const filterElements = filtersFormElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_FILTER);
const featuresFilterContainerElement = filtersFormElement.querySelector(QuerySelector.TAG_NAME.FIELDSET);
const featureFilterElements = featuresFilterContainerElement.querySelectorAll(QuerySelector.CLASS_NAME.MAP_CHECKBOX_FILTER);

const priceRangeToValue = {
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

const getOfferKey = (inputName) => inputName.slice(inputName.indexOf('-') + 1);

const isPriceInRange = (price, priceRange) => priceRangeToValue[priceRange].min <= price && price <= priceRangeToValue[priceRange].max;

const findCheckedFeatureas = () => {
  const checkedElements = [];

  featureFilterElements.forEach((filterElement) => {
    if (filterElement.checked) {
      checkedElements.push(filterElement);
    }
  });

  return checkedElements;
};

const applyCheckboxFilters = (data) => data.filter(({ offer: { features } }) => {
  const checkedFilterElements = findCheckedFeatureas();

  if (!checkedFilterElements.length) {
    return data;
  }

  let coincedence = 0;

  if (features) {
    checkedFilterElements.forEach((filterElement) => {
      if (features.includes(filterElement.value)) {
        coincedence++;
      }
    });

    return coincedence === checkedFilterElements.length;
  }

  return coincedence;
});

const applySelectFilters = (data) => data.filter(({ offer }) => {
  let coincidenceCount = 0;
  let unusedFiltersCount = 0;

  filterElements.forEach((filterElement) => {
    if (filterElement.value === 'any') {
      unusedFiltersCount++;
      return;
    }

    const key = getOfferKey(filterElement.name);

    if (key === 'price' && isPriceInRange(offer[key], filterElement.value)) {
      coincidenceCount++;
    } else if (offer[key] === 0 || offer[key] === (+filterElement.value || filterElement.value)) {
      coincidenceCount++;
    }
  });

  if (filterElements.length - unusedFiltersCount === coincidenceCount) {
    return true;
  }
});

const filterData = (data) => applyCheckboxFilters(applySelectFilters(data));

const setFilterChange = (cb, data) => {
  filtersFormElement.addEventListener('change', () => {
    cb(filterData(data));
  });
};

const setFilterReset = (cb, data) => {
  resetBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    filtersFormElement.reset();
    cb(data);
  });
};

const setFilterFormEventListeners = (cb, data) => {
  setFilterChange(cb, data);
  setFilterReset(cb, data);
};

export { toggleFiltersDisebledState, setFilterFormEventListeners };
