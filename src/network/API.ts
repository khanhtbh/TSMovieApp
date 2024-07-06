import axios from 'axios';
import {Movie, MovieDetail} from '../models/Movie';

const API_BASE_URL = 'https://search.imdbot.workers.dev/';

class API {
  static async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}?q=${query}`);
      const data = response.data.description;
      var movies: Movie[] = [];
      for (const item of data) {
        var movie = API.parseMovie(item);
        movies.push(movie);
      }
      return movies;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  static async getMovie(id: string): Promise<MovieDetail> {
    try {
      const response = await axios.get(`${API_BASE_URL}?tt=${id}`);
      const movie: MovieDetail = response.data.short;
      return movie;
    } catch (error) {
      console.error('Error getting movie:', error);
      throw error;
    }
  }

  private static parseMovie(data: any): Movie {
    return {
      title: data['#TITLE'],
      year: data['#YEAR'],
      id: data['#IMDB_ID'],
      rank: data['#RANK'],
      aka: data['#AKA'],
      imdbUrl: data['#IMDB_URL'],
      imdbIv: data['#IMDB_IV'],
      imgPoster: data['#IMG_POSTER'],
      photoWidth: data.photo_width,
      photoHeight: data.photo_height,
    };
  }
}

export default API;
