import {makeAutoObservable, runInAction} from 'mobx';
import API from '../network/API';
import {Movie, MovieDetail} from '../models/Movie';

const randomKeywords = [
  'movies',
  'prime video',
  'labor day',
  'godzilla minus one',
  'united states',
  'a.i.',
  'robert de niro',
  'austin butler',
  'eddie murphy',
  'inside out 2',
  'star wars',
  'tom hardy',
  'horror movie',
  'horror movies',
  'jack nicholson',
  'kirsten dunst',
  'tv shows',
  'freddie kreuger',
  'late night with the devil',
  'michael myers',
  'monkey man',
  'russell crowe',
  'russell',
  'the fall guy',
];

class MovieStore {
  movies: Movie[] = [];
  searchResults: Movie[] = [];
  movieDetail: MovieDetail | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovies() {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const keyword: string =
        randomKeywords.at((Math.random() * 100) % randomKeywords.length) ?? '';
      const data = await API.searchMovies(keyword);
      runInAction(() => {
        this.movies = data.slice(0, Math.min(10, data.length));
      });
    } catch (error) {
      runInAction(() => (this.error = 'Failed to fetch movies'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async search(query: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const data = await API.searchMovies(query);
      runInAction(() => (this.searchResults = data));
    } catch (error) {
      runInAction(() => (this.error = 'Failed to search movies'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async getMovieDetail(id: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const data = await API.getMovie(id);
      runInAction(() => (this.movieDetail = data));
    } catch (error) {
      runInAction(() => (this.error = 'Failed to get movie detail'));
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}

export default MovieStore;
