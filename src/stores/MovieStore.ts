import {makeAutoObservable, runInAction} from 'mobx';
import {getMovies, searchMovies} from '../network/API';
import {Movie} from '../models/Movie';

class MovieStore {
  movies: Movie[] = [];
  searchResults: Movie[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovies() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await getMovies();
      runInAction(() => {
        this.movies = data.slice(0, Math.min(10, data.length));
      });
    } catch (error) {
      this.error = 'Failed to fetch movies';
    } finally {
      this.isLoading = false;
    }
  }

  async search(query: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await searchMovies(query);
      console.log('Search Data ', data);
      runInAction(() => (this.searchResults = data));
    } catch (error) {
      this.error = 'Failed to search movies';
    } finally {
      this.isLoading = false;
    }
  }
}

export default MovieStore;
