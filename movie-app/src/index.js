import './styles/index.scss';
import OmdbApiService from './services/omdbApiService';
import DummyService from './services/dummyService';
import renderMovies from './movies';
import movieFullCardTemplate from './templates/movie-card-full.ejs';
import searchListItemTemplate from './templates/search-list-item.ejs';
import loaderTemaplate from './templates/loader.ejs';
import { debounce } from './helpers';

import imagePlaceholder from './assets/img-placeholder.svg';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-form__input');
const searchList = searchForm.querySelector('.search-form__search-list')
const moviesList = document.querySelector('.movies-list');
const popup = document.querySelector('.popup');

// const apiService = new OmdbApiService();
const apiService = new DummyService();

let currentLoadedData = {
  search: null,
  data: null
};
let currentSearch = '';
let currentSearchData = null;
const errorMessage = '<p style="padding-left: 10px;">No movies found</p>';

async function handleSearchFormSubmit(e) {
  e && e.preventDefault();
  const searchInputValue = searchInput.value;
  hideSearchList();
  if (searchInputValue === '') {
    return;
  }
  
  moviesList.innerHTML = loaderTemaplate();

  let searchData = null;
  if (searchInputValue === currentSearch) {
    searchData = currentSearchData;
  } else {
    searchData = await apiService.search(searchInputValue);
    currentSearch = searchInputValue;
    currentSearchData = searchData;
  }

  if (currentLoadedData.search !== currentSearch) {
    let html = null;
    if (searchData.Search) {
      const ids = searchData.Search.map(({ imdbID }) => imdbID);
      const data = await apiService.fetchMoviesById(ids);
      currentLoadedData.search = currentSearch;
      currentLoadedData.data = data;
      html = renderMovies(data);

      handleImgLoadErrors(moviesList);
    }
    moviesList.innerHTML = html || errorMessage;
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
    if (!currentLoadedData.data) {
      return;
    }
    const movieData = currentLoadedData.data.find(el => el.imdbID === movieCard.dataset.id);
    const movieHTML = movieFullCardTemplate(movieData);
    popup.classList.add('popup_show');
    const inner = popup.querySelector('.popup__card');
    inner.innerHTML = movieHTML;

    handleImgLoadErrors(inner);
  }
}

function isClickOutside(e, element) {
  return e && !e.path.find(el => el.classList && el.classList.contains(element));
}

function handlePopupClick(e) {
  if (isClickOutside(e, 'popup__card')) {
    popup.classList.remove('popup_show');
  }
}

async function handleSearchInput(e) {
  console.log('Searching for', e.target.value);
  const searchInputValue = e.target.value;
  hideSearchList();
  if (searchInputValue === '') {
    return;
  }
  
  searchList.classList.add('search-form__search-list_show');
  searchList.innerHTML = loaderTemaplate();

  let searchData = null;
  if (searchInputValue === currentSearch) {
    searchData = currentSearchData;
  } else {
    searchData = await apiService.search(searchInputValue);
    currentSearch = searchInputValue;
    currentSearchData = searchData;
  }

  let html = null;
  if (searchData.Search) {
    html = searchData.Search
      .map(item => searchListItemTemplate(item))
      .join('');
  }
  searchList.innerHTML = html || errorMessage;
}

async function handleSearchListClick(e) {
  console.log(e);

  moviesList.innerHTML = loaderTemaplate();

  if (e.target.dataset) {
    hideSearchList();
    const id = e.target.dataset.id;
    console.log(id)
    searchInput.value = '';

    const data = [await apiService.fetchMovieById(id)];
    currentLoadedData.data = data;
    const movies = renderMovies(data);
    moviesList.innerHTML = movies;
    
    handleImgLoadErrors(moviesList);
  }
}

function hideSearchList() {
  searchList.classList.remove('search-form__search-list_show');
}

function handleDocumentCLick(e) {
  if (isClickOutside(e, 'search-form')) {
    hideSearchList();
  }
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
searchInput.addEventListener('input', debounce(500, handleSearchInput));
searchList.addEventListener('click', handleSearchListClick);
moviesList.addEventListener('click', handleMovieListClick);
popup.addEventListener('click', handlePopupClick);
document.addEventListener('click', handleDocumentCLick);

function init() {
  // searchInput.value = 'star wars';
  searchInput.focus();
  // handleSearchFormSubmit();
}

init();