import { debounce } from './util.js';
import { renderPhotos } from './thumbnails.js';
import { closeModal } from './photo-upload-modal.js';
import { setUserFormSubmit } from './photo-upload-modal.js';
import { getData } from './api.js';
import { setFilterDefault, setFilterRandom, setFilterDiscussed } from './sort-filter.js';
import './photo-upload-modal.js';
import './photo-effects-slider.js';
import './upload-result-modal.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderPhotos(photos);
  setFilterDefault(photos, debounce(renderPhotos, RERENDER_DELAY));
  setFilterDiscussed(photos, debounce(renderPhotos, RERENDER_DELAY));
  setFilterRandom(photos, debounce(renderPhotos, RERENDER_DELAY));
});

setUserFormSubmit(closeModal);
