import { shuffle } from './util.js';

const filtersListElement = document.querySelector('.img-filters__form');
const discussedFilterButton = filtersListElement.querySelector('#filter-discussed');
const defaultFilterButton = filtersListElement.querySelector('#filter-default');
const randomFilterButton = filtersListElement.querySelector('#filter-random');
const filterButtons = filtersListElement.querySelectorAll('.img-filters__button');

const resetActiveFilter = () => {
  filterButtons.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
};

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const RANDOM_PHOTOS_COUNT = 10;

const initSortings = (photos, renderPhotos) => {
  defaultFilterButton.addEventListener('click', () => {
    renderPhotos(photos);
    resetActiveFilter();
    defaultFilterButton.classList.add('img-filters__button--active');
  });
  discussedFilterButton.addEventListener('click', () => {
    renderPhotos(photos.slice().sort(sortByComments));
    resetActiveFilter();
    discussedFilterButton.classList.add('img-filters__button--active');
  });
  randomFilterButton.addEventListener('click', () => {
    renderPhotos(shuffle(photos).slice(0, RANDOM_PHOTOS_COUNT));
    resetActiveFilter();
    randomFilterButton.classList.add('img-filters__button--active');
  });
};

export { initSortings };
