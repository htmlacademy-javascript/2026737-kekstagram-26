import { checkLength } from './util.js';
import {renderPhotos} from './thumbnails.js';
import { closeModal } from './photo-upload-modal.js';
import { setUserFormSubmit } from './photo-upload-modal.js';
import './photo-upload-modal.js';
import './photo-effects-slider.js';
import './api.js';
import { getData } from './api.js';
import './upload-result-modal.js';

checkLength('Hello', 5);
getData(renderPhotos);

setUserFormSubmit(closeModal);
