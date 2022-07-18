import { getRandomElement } from './util.js';

const filtersListElement = document.querySelector('.img-filters__form');
const filterDiscussedElement = filtersListElement.querySelector('#filter-discussed');
const filterDefaultElement = filtersListElement.querySelector('#filter-default');
const filterRandomElement = filtersListElement.querySelector('#filter-random');
const filtersList = filtersListElement.querySelectorAll('.img-filters__button');

const updateFilter = (evt) => {
  filtersList.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
};

const setFilterDefault = (photos, cb) => {
  filterDefaultElement.addEventListener('click', (evt) => {
    cb(photos);
    updateFilter(evt);
  });

};

const sortDiscussed = (a, b) => b.comments.length - a.comments.length;

const setFilterDiscussed = (photos, cb) => {
  filterDiscussedElement.addEventListener('click', (evt) => {
    const photosSorted = photos.slice().sort(sortDiscussed);
    cb(photosSorted);
    updateFilter(evt);
  });
};


const setFilterRandom = (photos, cb) => {
  filterRandomElement.addEventListener('click', (evt) => {
    const photosSorted = [];
    while (photosSorted.length < 10) {
      const randomPhoto = getRandomElement(photos);
      if (!photosSorted.includes(randomPhoto)) {
        photosSorted.push(randomPhoto);
      }
    }
    cb(photosSorted);
    updateFilter(evt);
  });
};

export { setFilterDefault, setFilterRandom, setFilterDiscussed };
