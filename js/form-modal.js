import { QuerySelector, isEscapeKey, } from './dom-util.js';

const errorMessageTemplateElement = document.querySelector(QuerySelector.ID.ERROR).content.querySelector(QuerySelector.CLASS_NAME.ERROR);
const successMessageTemplateElement = document.querySelector(QuerySelector.ID.SUCCESS).content.querySelector(QuerySelector.CLASS_NAME.SUCCESS);

const typeToElement = {
  success: successMessageTemplateElement,
  error: errorMessageTemplateElement
};

const modalEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
};

const modalClickHandler = () => {
  closeModal();
};

const showModal = (type) => {
  document.body.append(typeToElement[type]);
  document.addEventListener('keydown', modalEscKeydownHandler);
  document.addEventListener('click', modalClickHandler);
};

function closeModal() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', modalEscKeydownHandler);
  document.removeEventListener('click', modalClickHandler);
}

export { showModal };
