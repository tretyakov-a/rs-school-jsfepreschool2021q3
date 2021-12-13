
import './styles/index.scss';
import OmdbApiService from './services/omdbApiService';
import DummyService from './services/dummyService';
import renderMoviesList from './movies-list';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('[name="search"]');
const listContainer = document.querySelector('.main');

const apiService = new DummyService();

async function handleSearchFormSubmit(e) {
  e && e.preventDefault();
  console.log('Fetch some movies!');
  
  const searchData = await apiService.search(searchInput.value);
  console.log(searchData);
  const ids = searchData.map(({ imdbID }) => imdbID);
  const data = await apiService.fetchMoviesById(ids);

  const moviesList = renderMoviesList(data);
  listContainer.innerHTML = '';
  listContainer.appendChild(moviesList);
}

searchForm.addEventListener('submit', handleSearchFormSubmit);

function init() {
  searchInput.value = 'star wars';
  handleSearchFormSubmit();
}

init();