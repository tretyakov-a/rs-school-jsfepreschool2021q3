import movieCardTemplate from './templates/movie-card.ejs';

export default function renderMovies(items) {
  return items.reduce((movies, item) => {
    return movies + renderListItem(item);
  }, '');
}

function renderListItem(item) {
  return movieCardTemplate(item);
}

