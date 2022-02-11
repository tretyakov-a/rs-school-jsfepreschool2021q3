
import { dummySearch, dummyData } from './dummyData';

export default class DummyService {
  constructor() {
    this.delay = 500;
  }

  async search() {
    const data = await new Promise(resolve => {
      setTimeout(() => {
        resolve(dummySearch);
      }, this.delay);
    });
    return data;
  }

  async fetchMovieByTitle() {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyData[0]);
      }, this.delay);
    });
  }

  async fetchMovieById(id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyData.find(el => el.imdbID === id));
      }, this.delay);
    });
  }

  async fetchMoviesById() {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyData);
      }, this.delay);
    });
  }
}