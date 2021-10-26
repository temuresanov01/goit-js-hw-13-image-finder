import './sass/main.scss';
import { fetchImages } from './js/api';
import galleryCard from './templates/galleryCard';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form_input');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.load-more');

formRef.addEventListener('submit', requestForm);
btnLoadMoreRef.addEventListener('click', loadMore);
galleryRef.addEventListener('click', bigImage);

let webSearch = '';
let webPage = 1;

function requestForm(event) {
  event.preventDefault();
  galleryRef.innerHTML = '';
  webPage = 1;
  webSearch = inputRef.value;
  if (webSearch === '') return;

  getPrintImages(false);
}

function loadMore(event) {
  webPage += 1;
  getPrintImages(true);
}
