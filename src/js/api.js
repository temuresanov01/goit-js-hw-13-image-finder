const API_KEY = '23996905-c7bf8d03157e8f53790f8e72e';
// const BASE_URL = 'https://pixabay.com/api/'

const fetchImages = (webSearch, webPage) => {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${webSearch}&page=${webPage}&per_page=12&key=${API_KEY}`;
  return fetch(BASE_URL)
    .then(response => response.json())
    .catch(err => alert(err));
}; 
export { fetchImages };
