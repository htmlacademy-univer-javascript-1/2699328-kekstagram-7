import {createPhotos} from './generate-data.js';
import {renderPictures} from './pictures.js';
import './form.js';

const pictures = createPhotos();

renderPictures(pictures);
