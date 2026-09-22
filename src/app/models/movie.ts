export type MovieGenre =
  | 'Science Fiction'
  | 'Action'
  | 'Drama'
  | 'Thriller'
  | 'Animation'
  | 'Crime'
  | 'Adventure'
  | 'Fantasy'
  | 'Comedy'
  | 'Mystery';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: MovieGenre;
  rating: number;
  description: string;
  posterUrl: string;
  director: string;
  duration: string;
}

export const MOVIE_GENRES: MovieGenre[] = [
  'Science Fiction',
  'Action',
  'Drama',
  'Thriller',
  'Animation',
  'Crime',
  'Adventure',
  'Fantasy',
  'Comedy',
  'Mystery',
];
