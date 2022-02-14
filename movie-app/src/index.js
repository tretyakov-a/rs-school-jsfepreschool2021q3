import './styles/index.scss';
import requirements from '../requirements.md';
import OmdbApiService from './js/services/omdbApiService';
import DummyService from './js/services/dummyService';
import renderMovies from './js/movies';
import movieFullCardTemplate from './templates/movie-card-full.ejs';
import searchListItemTemplate from './templates/search-list-item.ejs';
import loaderTemplate from './templates/loader.ejs';
import { debounce, isClickOutside } from './js/helpers';

import imagePlaceholder from './assets/img-placeholder.svg';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-form__input');
const searchList = searchForm.querySelector('.search-form__search-list')
const clearButton = searchForm.querySelector('.search-form__button_clear');
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

  const searchInputValue = searchInput.value;
  if (searchInputValue === '') {
    return;
  }
  const searchData = await search(searchInputValue);

  hideSearchList();
  let data = null;
  if (searchData.Search) {
    if (currentLoadedData.search === currentSearch && currentLoadedData.data.length === currentSearchData.Search.length) {
      data = currentLoadedData.data;
    } else {
      moviesList.innerHTML = loaderTemplate();
      
      const ids = searchData.Search.map(({ imdbID }) => imdbID);
      data = await apiService.fetchMoviesById(ids);
      currentLoadedData.search = currentSearch;
      currentLoadedData.data = data;
    }
  }

  handleImgLoadErrors(moviesList);
  
  moviesList.innerHTML = data ? renderMovies(data) : errorMessage;
  searchInput.blur();
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
  const searchInputValue = searchInput.value;

  if (searchInputValue === '') {
    currentSearch = '';
    currentSearchData = null;
    searchList.innerHTML = '';
    clearButton.classList.add('search-form__button_hide');
    hideSearchList();
    return;
  }
  clearButton.classList.remove('search-form__button_hide');
  showSearchList();
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
  if (e.target.dataset.id) {
    moviesList.innerHTML = loaderTemplate();

    const id = e.target.dataset.id;

    let data = null;
    if (currentSearch === currentLoadedData.search && currentLoadedData.data) {
      const loadedDataItem = currentLoadedData.data.find(item => item.imdbID === id);
      if (loadedDataItem) {
        data = [loadedDataItem];
      }
    }
    if (!data || data.length === 0) {
      data = [await apiService.fetchMovieById(id)];
      currentLoadedData.search = currentSearch;
      currentLoadedData.data = data;
    }
    const movies = renderMovies(data);
    moviesList.innerHTML = movies;
    
    handleImgLoadErrors(moviesList);
    hideSearchList();
  }
}

function handleClearButtonClick(e) {
  searchInput.value = '';
  clearButton.classList.add('search-form__button_hide');
  handleSearchInput();
}

function showSearchList() {
  document.addEventListener('click', handleDocumentClick);
  searchList.classList.add('search-form__search-list_show');
}

function hideSearchList() {
  document.removeEventListener('click', handleDocumentClick);
  searchList.classList.remove('search-form__search-list_show');
}

function handleDocumentClick(e) {
  if (isClickOutside(e, 'search-form')) {
    hideSearchList();
  }
}

function handleSearchInputFocus(e) {
  if (currentSearch === '') {
    return;
  }
  showSearchList();
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
searchInput.addEventListener('input', debounce(500, handleSearchInput));
searchInput.addEventListener('focus', handleSearchInputFocus);
clearButton.addEventListener('click', handleClearButtonClick);
searchList.addEventListener('click', handleSearchListClick);
moviesList.addEventListener('click', handleMovieListClick);
popup.addEventListener('click', handlePopupClick);


async function init() {
  searchInput.value = 'star wars';
  await handleSearchInput();
  await handleSearchFormSubmit();
  searchInput.focus();
}

init();
console.log(requirements);