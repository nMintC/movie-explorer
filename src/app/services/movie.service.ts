import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MOVIES } from '../data/movies';
import { Movie, MovieGenre } from '../models/movie';

export type MovieSort = 'rating-desc' | 'newest' | 'oldest' | 'title-az';
export type MovieSourceLabel = 'Local mock data' | 'Static JSON asset' | 'TMDB API' | 'Local fallback data';

export interface MovieQuery {
  searchText: string;
  genre: MovieGenre | 'All';
  sort: MovieSort;
}

interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  overview?: string;
  poster_path?: string | null;
  vote_average?: number;
}

interface TmdbPopularResponse {
  results: TmdbMovie[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  // ANGULAR LEARNING: Dependency Injection with inject()
  private readonly http = inject(HttpClient);

  // ANGULAR LEARNING: Signal state for async data loading.
  private readonly moviesState = signal<Movie[]>(MOVIES);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private readonly sourceLabelState = signal<MovieSourceLabel>('Local mock data');
  private hasLoadedConfiguredSource = false;

  readonly movies = this.moviesState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();
  readonly sourceLabel = this.sourceLabelState.asReadonly();

  loadMovies(): void {
    if (this.hasLoadedConfiguredSource) {
      return;
    }

    this.hasLoadedConfiguredSource = true;

    if (environment.movieApi.dataSource === 'mock') {
      this.useLocalMovies('Local mock data');
      return;
    }

    if (environment.movieApi.dataSource === 'tmdb' && !environment.movieApi.tmdbApiKey) {
      this.errorMessageState.set('No TMDB API key is configured. Showing local fallback data.');
      this.useLocalMovies('Local fallback data', false);
      return;
    }

    this.loadingState.set(true);
    this.errorMessageState.set(null);

    this.getConfiguredRemoteMovies()
      .pipe(
        catchError(() => {
          this.errorMessageState.set('Could not load remote movies. Showing local fallback data.');
          this.sourceLabelState.set('Local fallback data');
          return of(MOVIES);
        }),
        finalize(() => this.loadingState.set(false)),
      )
      .subscribe((movies) => this.moviesState.set(movies));
  }

  getMovies(): Movie[] {
    return [...this.moviesState()];
  }

  getMovieById(id: number): Movie | undefined {
    return this.moviesState().find((movie) => movie.id === id);
  }

  searchMovies(query: MovieQuery): Movie[] {
    const searchTerm = query.searchText.trim().toLowerCase();

    const filtered = this.moviesState().filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
      const matchesGenre = query.genre === 'All' || movie.genre === query.genre;

      return matchesSearch && matchesGenre;
    });

    return this.sortMovies(filtered, query.sort);
  }

  getFeaturedMovies(): Movie[] {
    return this.moviesState().filter((movie) => [3, 8, 16, 26].includes(movie.id));
  }

  getTopRatedMovies(limit = 6): Movie[] {
    return this.sortMovies(this.moviesState(), 'rating-desc').slice(0, limit);
  }

  getRecommendedMovies(limit = 6): Movie[] {
    return this.moviesState()
      .filter((movie) => movie.year >= 2014)
      .slice(0, limit);
  }

  // ANGULAR LEARNING: HttpClient architecture for a future/local API source.
  getMoviesFromStaticJson(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.movieApi.staticMoviesUrl);
  }

  private getConfiguredRemoteMovies(): Observable<Movie[]> {
    if (environment.movieApi.dataSource === 'static-json') {
      this.sourceLabelState.set('Static JSON asset');
      return this.getMoviesFromStaticJson();
    }

    if (environment.movieApi.dataSource === 'tmdb') {
      this.sourceLabelState.set('TMDB API');
      return this.getPopularMoviesFromTmdb();
    }

    return throwError(() => new Error('Unsupported movie data source'));
  }

  private getPopularMoviesFromTmdb(): Observable<Movie[]> {
    return this.http
      .get<TmdbPopularResponse>(`${environment.movieApi.tmdbBaseUrl}/movie/popular`)
      .pipe(map((response) => response.results.map((movie, index) => this.mapTmdbMovie(movie, index))));
  }

  private mapTmdbMovie(movie: TmdbMovie, index: number): Movie {
    const releaseYear = movie.release_date ? Number(movie.release_date.slice(0, 4)) : 2026;

    return {
      id: movie.id,
      title: movie.title ?? movie.name ?? 'Untitled Movie',
      year: Number.isNaN(releaseYear) ? 2026 : releaseYear,
      genre: 'Drama',
      rating: Number((movie.vote_average ?? 0).toFixed(1)),
      description: movie.overview || 'No description was provided by the remote API.',
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : `https://placehold.co/640x420/111827/f8fafc?text=Remote+Movie+${index + 1}`,
      director: 'Remote API',
      duration: 'Unknown',
    };
  }

  private useLocalMovies(sourceLabel: MovieSourceLabel, clearError = true): void {
    this.moviesState.set(MOVIES);
    this.sourceLabelState.set(sourceLabel);
    this.loadingState.set(false);

    if (clearError) {
      this.errorMessageState.set(null);
    }
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
