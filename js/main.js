import { checkLength } from './util.js';
import { createPhotos } from './data.js';
import { renderPhotos } from './thumbnails.js';
import { openFullPhoto } from  './full-photo.js';

checkLength('Hello', 5);
const photos = createPhotos(25);
renderPhotos(photos);
openFullPhoto(photos);
