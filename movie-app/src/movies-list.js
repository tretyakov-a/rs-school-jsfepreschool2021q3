import movieCardTemplate from './templates/movie-card.ejs';

export default function renderMoviesList(items) {
  const list = document.createElement('ul');
  list.classList.add('movies-list');
  items.forEach(item => {
    list.innerHTML += renderListItem(item);
  });
  return list;
}

function renderListItem(item) {
  return movieCardTemplate(item);
}

