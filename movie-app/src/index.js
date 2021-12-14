import './styles/index.scss';
import OmdbApiService from './services/omdbApiService';
import DummyService from './services/dummyService';
import renderMovies from './movies';
import movieFullCardTemplate from './templates/movie-card-full.ejs';

import imagePlaceholder from './assets/img-placeholder.svg';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('[name="search"]');
const moviesList = document.querySelector('.movies-list');
const popup = document.querySelector('.popup');

const apiService = new DummyService();
let currentData = [];

async function handleSearchFormSubmit(e) {
  e && e.preventDefault();
  const searchData = await apiService.search(searchInput.value);

  if (searchData.Search) {
    const ids = searchData.Search.map(({ imdbID }) => imdbID);
    const data = await apiService.fetchMoviesById(ids);
    currentData = data;
    const movies = renderMovies(data);
    moviesList.innerHTML = movies;

    handleImgLoadErrors(moviesList);
  } else {
    moviesList.innerHTML = 'No movies found';
  }
}


function handleImgLoadErrors(container) {
  setTimeout(() => {
    const imgs = container.querySelectorAll('.poster');
    for(const img of imgs) {
      img.addEventListener('error', handleImgError);
    }
  });
}

function handleImgError(e) {
  e.target.src = imagePlaceholder;
  e.target.removeEventListener('error', handleImgError);
}

function handleMovieListClick(e) {
  const movieCard = e.target.closest('.movie-card');
  if (movieCard) {
    if (!currentData) {
      return;
    }
    const movieData = currentData.find(el => el.imdbID === movieCard.dataset.id);
    const movieHTML = movieFullCardTemplate(movieData);
    popup.classList.add('popup_show');
    const inner = popup.querySelector('.popup__card');
    inner.innerHTML = movieHTML;

    handleImgLoadErrors(inner);
  }
}

function handlePopupClick(e) {
  if (e && !e.path.find(el => el.classList && el.classList.contains('popup__card'))) {
    popup.classList.remove('popup_show');
  }
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
moviesList.addEventListener('click', handleMovieListClick);
popup.addEventListener('click', handlePopupClick);

function init() {
  searchInput.value = 'star wars';
  handleSearchFormSubmit();
}

init();