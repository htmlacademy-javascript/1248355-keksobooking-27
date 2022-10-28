import { QuerySelector } from './dom-util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarImgElement = document.querySelector(QuerySelector.CLASS_NAME.AVATAR_IMG);
const avatarInputElement = document.querySelector(QuerySelector.ID.AVATAR);
const photoContainerElement = document.querySelector(QuerySelector.CLASS_NAME.PHOTO_PREVIEW_CONTAINER);
const photoInputElement = document.querySelector(QuerySelector.ID.PHOTO);
const avatarSrc = avatarImgElement.src;

const isFileType = (file) => FILE_TYPES.some((fileType) => file.name.endsWith(fileType));

const setAvatarImgChange = () => {
  avatarInputElement.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (isFileType(file)) {
      avatarImgElement.src = URL.createObjectURL(file);
    }
  });
};

const setPhotoImgChange = () => {
  photoInputElement.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (isFileType(file)) {
      photoContainerElement.innerHTML = '';

      const imgElement = document.createElement('img');
      imgElement.src = URL.createObjectURL(file);
      imgElement.style.width = '100%';
      photoContainerElement.append(imgElement);
    }
  });
};

const clearImagesPreview = () => {
  avatarImgElement.src = avatarSrc;
  photoContainerElement.innerHTML = '';
};

export { setAvatarImgChange, setPhotoImgChange, clearImagesPreview };
