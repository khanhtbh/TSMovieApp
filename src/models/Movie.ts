export interface Movie {
  title: string;
  year: number;
  id: string;
  rank: number;
  aka: string;
  imdbUrl: string;
  imdbIv: string;
  imgPoster: string;
  photoWidth: number;
  photoHeight: number;
}

import {Movie as MovieDetail} from 'schema-dts';

export {MovieDetail};
