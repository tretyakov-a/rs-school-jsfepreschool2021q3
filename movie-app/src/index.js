import './styles/index.scss';
import OmdbApiService from './services/omdbApiService';
import DummyService from './services/dummyService';
import renderMovies from './movies';
import movieFullCardTemplate from './templates/movie-card-full.ejs';
import searchListItemTemplate from './templates/search-list-item.ejs';
import loaderTemplate from './templates/loader.ejs';
import { debounce } from './helpers';

import imagePlaceholder from './assets/img-placeholder.svg';

// TODO: add pagination
// TODO: add some animations for: popup, search-list
// TODO: refactor index.js

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-form__input');
const searchList = searchForm.querySelector('.search-form__search-list')
const moviesList = document.querySelector('.movies-list');
const popup = document.querySelector('.popup');

const apiService = new OmdbApiService();
// const apiService = new DummyService();

let currentLoadedData = {
  search: null,
  data: null
};
let currentSearch = '';
let currentSearchData = null;
const errorMessage = '<p style="padding-left: 10px;">No movies found</p>';

async function handleSearchFormSubmit(e) {
  e && e.preventDefault();

  hideSearchList();
  const searchInputValue = searchInput.value;
  if (searchInputValue === '') {
    return;
  }
  const searchData = await search(searchInputValue);

  if (currentLoadedData.search !== currentSearch) {
    let html = null;
    if (searchData.Search) {
      moviesList.innerHTML = loaderTemplate();
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
    popup.classList.add('popup_show');
    const inner = popup.querySelector('.popup__card');

    const movieData = currentLoadedData.data.find(el => el.imdbID === movieCard.dataset.id);
    const html = movieFullCardTemplate(movieData);
    inner.innerHTML = html;

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

async function search(value) {
  let searchData = null;
  if (value === currentSearch) {
    searchData = currentSearchData;
  } else {
    searchData = await apiService.search(value);
    currentSearch = value;
    currentSearchData = searchData;
  }
  return searchData;
}

async function handleSearchInput(e) {
  const searchInputValue = e.target.value;

  if (searchInputValue === '') {
    hideSearchList();
    return;
  }
  searchList.classList.add('search-form__search-list_show');
  searchList.innerHTML = loaderTemplate();
  
  const searchData = await search(searchInputValue);

  let html = null;
  if (searchData.Search) {
    html = searchData.Search
      .map(item => searchListItemTemplate(item))
      .join('');
  }
  searchList.innerHTML = html || errorMessage;
}

async function handleSearchListClick(e) {
  moviesList.innerHTML = loaderTemplate();

  if (e.target.dataset) {
    hideSearchList();
    const id = e.target.dataset.id;
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
  searchInput.value = 'star wars';
  searchInput.focus();
  handleSearchFormSubmit();
}

init();