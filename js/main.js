import { checkLength } from './util.js';
import { createPhotos } from './data.js';
import { renderPhotos } from './thumbnails.js';
import { fullPhoto } from  './fullphoto.js';

checkLength('Hello', 5);
const photos = createPhotos(25);
renderPhotos(photos);
fullPhoto(photos);
