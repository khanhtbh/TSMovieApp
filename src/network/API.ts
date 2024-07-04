import axios from 'axios';
import {Movie} from '../models/Movie';

const API_BASE_URL = 'https://search.imdbot.workers.dev/';

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const randomKeyword = [
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
      'russell crowerussell',
      'the fall guy',
    ];
    const keyword = randomKeyword.at(
      (Math.random() * 100) % randomKeyword.length,
    );
    console.log('initiate keyword: ' + keyword);
    const response = await axios.get(`${API_BASE_URL}?q=${keyword}`);
    const data = response.data.description;
    var movies: Movie[] = [];
    for (const item of data) {
      var movie = parseMovie(item);
      movies.push(movie);
    }
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${query}`);
    const data = response.data.description;
    var movies: Movie[] = [];
    for (const item of data) {
      var movie = parseMovie(item);
      movies.push(movie);
    }
    return movies; // Cast the data to Movie[]
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

function parseMovie(data: any): Movie {
  return {
    title: data['#TITLE'],
    year: data['#YEAR'],
    id: data['#IMDB_ID'],
    rank: data['#RANK'],
    aka: data['#AKA'],
    imdbUrl: data['#IMDB_URL'],
    imdbIv: data['#IMDB_IV'],
    imgPoster: data['#IMG_POSTER'],
    photoWidth: data['photo_width'],
    photoHeight: data['photo_height'],
  };
}
