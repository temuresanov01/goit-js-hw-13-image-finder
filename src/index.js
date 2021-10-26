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
let Page = 1;

function requestForm(event) {
  event.preventDefault();
  galleryRef.innerHTML = '';
  Page = 1;
  webSearch = inputRef.value;
  if (webSearch === '') return;

  getPrintImages(false);
}

function loadMore(event) {
  webPage += 1;
  getPrintImages(true);
}
function getPrintImages(winScroll) {
  fetchData(searchWord, page).then(data => {
    const cards = galleryCard(data.hits);
    const hitsLength = data.hits.length;

    galleryRef.insertAdjacentHTML('beforeend', cards);
    btnLoadMoreRef.classList.add('is-open');
    formRef.reset();

    if (hitsLength < 1) {
      btnLoadMoreRef.classList.remove('is-open');
    }
      if (hitsLength === 0) {
        alert ('Введите правильное название поиска, пожалуйста!')
    //   alert('Enter correct name of search please!');
    }
    if (winScroll) {
      winScroll();
    }
  });
}

function scroll() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

function biggestFoto(event) {
  if (event.target.tagName !== 'IMG') return;

  const largeImageURL = event.target.dataset.bigImage;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="420" height="500">
`);
  instance.show();
}
