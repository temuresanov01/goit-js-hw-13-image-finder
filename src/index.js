import './sass/main.scss';
import { fetchImages } from './js/api';
import galleryCard from './templates/galleryCard';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

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
function getPrintImages(shouldScroll) {
  fetchImages(webSearch, webPage).then(data => {
    const carts = galleryCard(data.hits);
    const hitsLength = data.hits.length;

    galleryRef.insertAdjacentHTML('beforeend', carts);
    btnLoadMoreRef.classList.add('is-open');
    formRef.reset();

    if (hitsLength < 1) {
      btnLoadMoreRef.classList.remove('is-open');
    }
    if (hitsLength === 0) {
      alert('Enter correct name of search please!');
    }
    if (shouldScroll) {
      scroll();
    }
  });
}

function scroll() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

function bigImage(event) {
  if (event.target.tagName !== 'IMG') return;

  const largeImageURL = event.target.dataset.bigImage;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="420" height="500">
`);
  instance.show();
}
