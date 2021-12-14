import './styles/index.scss';
import OmdbApiService from './services/omdbApiService';
import DummyService from './services/dummyService';
import renderMovies from './movies';
import movieFullCardTemplate from './templates/movie-card-full.ejs';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('[name="search"]');
const moviesList = document.querySelector('.movies-list');
const popup = document.querySelector('.popup');

const apiService = new DummyService();
let currentData = [];

async function handleSearchFormSubmit(e) {
  e && e.preventDefault();
  console.log('Fetch some movies!');
  
  const searchData = await apiService.search(searchInput.value);
  console.log(searchData);
  const ids = searchData.map(({ imdbID }) => imdbID);
  const data = await apiService.fetchMoviesById(ids);
  currentData = data;

  const movies = renderMovies(data);
  moviesList.innerHTML = movies;
}

function handleMovieListClick(e) {
  const movieCard = e.target.closest('.movie-card');
  if (movieCard) {
    const movieData = currentData.find(el => el.imdbID === movieCard.dataset.id);
    const movieHTML = movieFullCardTemplate(movieData);
    console.log(movieData);
    popup.classList.add('popup_show');
    const inner = popup.querySelector('.popup__card');
    inner.innerHTML = movieHTML;
    console.log(inner);
  }
}

function handlePopupClick(e) {
  console.log(e);
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