export default class OmdbApiService {
  constructor() {
    this.apiKey = OMDB_API_KEY;
    this.baseQuery = `https://www.omdbapi.com/?apikey=${this.apiKey}&`;
    this.searchQuery = `${this.baseQuery}s=`;
    this.titleQuery = `${this.baseQuery}plot=full&t=`;
    this.idQuery = `${this.baseQuery}plot=full&i=`;
  }

  _getSearchQuery(str) {
    return this.searchQuery + encodeURIComponent(str);
  }

  _getFetchByIdQuery(id) {
    return this.idQuery + encodeURIComponent(id)
  }

  _getFetchByTitleQuery(title) {
    return this.titleQuery + encodeURIComponent(title)
  }

  _fetch = async query => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      if (data.Ratings) {
        const rotten = data.Ratings.find(item => item.Source === 'Rotten Tomatoes');
        if (rotten) {
          data.rotten = rotten.Value;
        }
      }
      return data;

    } catch (error) {
      console.error(error) ;
    }
  }
  async search(str) {
    const data =  await this._fetch(this._getSearchQuery(str));
    return data;
  }

  async fetchMovieByTitle(title) {
    return await this._fetch(this._getFetchByTitleQuery(title));
  }

  async fetchMovieById(id) {
    return await this._fetch(this._getFetchByIdQuery(id));
  }

  async fetchMoviesById(ids) {
    try {
      const data = await Promise.all(
        ids.map(id => this._fetch(this._getFetchByIdQuery(id)))
      );
      return data;

    } catch (error) {
      console.error(error);
    }
  }
}