import { MovieDataSource } from './movie-api-config';

export const environment = {
  production: false,
  movieApi: {
    dataSource: 'mock' as MovieDataSource,
    staticMoviesUrl: '/movies-api-sample.json',
    tmdbBaseUrl: 'https://api.themoviedb.org/3',
    tmdbApiKey: '',
    requestTimeoutMs: 5000,
  },
};
