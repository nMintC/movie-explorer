import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MOVIES } from '../data/movies';
import { Movie, MovieGenre } from '../models/movie';

export type MovieSort = 'rating-desc' | 'newest' | 'oldest' | 'title-az';

export interface MovieQuery {
  searchText: string;
  genre: MovieGenre | 'All';
  sort: MovieSort;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  // ANGULAR LEARNING: Dependency Injection with inject()
  private readonly http = inject(HttpClient);
  private readonly movies = MOVIES;

  getMovies(): Movie[] {
    return [...this.movies];
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }

  searchMovies(query: MovieQuery): Movie[] {
    const searchTerm = query.searchText.trim().toLowerCase();

    const filtered = this.movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
      const matchesGenre = query.genre === 'All' || movie.genre === query.genre;

      return matchesSearch && matchesGenre;
    });

    return this.sortMovies(filtered, query.sort);
  }

  getFeaturedMovies(): Movie[] {
    return this.movies.filter((movie) => [3, 8, 16, 26].includes(movie.id));
  }

  getTopRatedMovies(limit = 6): Movie[] {
    return this.sortMovies(this.movies, 'rating-desc').slice(0, limit);
  }

  getRecommendedMovies(limit = 6): Movie[] {
    return this.movies
      .filter((movie) => movie.year >= 2014)
      .slice(0, limit);
  }

  // ANGULAR LEARNING: HttpClient architecture for a future/local API source.
  getMoviesFromStaticJson(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/movies-api-sample.json');
  }

  private sortMovies(movies: Movie[], sort: MovieSort): Movie[] {
    return [...movies].sort((first, second) => {
      switch (sort) {
        case 'rating-desc':
          return second.rating - first.rating;
        case 'newest':
          return second.year - first.year;
        case 'oldest':
          return first.year - second.year;
        case 'title-az':
          return first.title.localeCompare(second.title);
      }
    });
  }
}
