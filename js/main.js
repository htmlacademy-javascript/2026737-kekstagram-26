import { debounce } from './util.js';
import { renderPhotos } from './thumbnails.js';
import { fetchData } from './api.js';
import { initSortings } from './sorting.js';
import { initPhotoEffectsSlider } from './photo-effects-slider.js';
import { initPhotoUpload } from './photo-upload-modal.js';

const RERENDER_DELAY = 500;

initPhotoEffectsSlider();
initPhotoUpload();

const debouncedRenderPhotos = debounce(renderPhotos, RERENDER_DELAY);

fetchData((photos) => {
  renderPhotos(photos);
  initSortings(photos, debouncedRenderPhotos);
});
