import {createPhotos} from './generate-data.js';
import {renderPictures} from './pictures.js';

const pictures = createPhotos();

renderPictures(pictures);
