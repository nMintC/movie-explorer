import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let httpTesting: HttpTestingController;
  const originalDataSource = environment.movieApi.dataSource;
  const originalStaticMoviesUrl = environment.movieApi.staticMoviesUrl;

  beforeEach(() => {
    environment.movieApi.dataSource = 'mock';
    environment.movieApi.staticMoviesUrl = '/movies-api-sample.json';

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    environment.movieApi.dataSource = originalDataSource;
    environment.movieApi.staticMoviesUrl = originalStaticMoviesUrl;
  });

  it('should retrieve a movie by id', () => {
    const service = TestBed.inject(MovieService);

    expect(service.getMovieById(1)?.title).toBe('Interstellar');
  });

  it('should search movies by title', () => {
    const service = TestBed.inject(MovieService);
    const results = service.searchMovies({ searchText: 'inception', genre: 'All', sort: 'rating-desc' });

    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Inception');
  });

  it('should filter by genre and sort newest first', () => {
    const service = TestBed.inject(MovieService);
    const results = service.searchMovies({ searchText: '', genre: 'Animation', sort: 'newest' });

    expect(results.length).toBeGreaterThan(1);
    expect(results.every((movie) => movie.genre === 'Animation')).toBe(true);
    expect(results[0].year).toBeGreaterThanOrEqual(results[1].year);
  });

  it('should load movies from a configured static JSON source', () => {
    environment.movieApi.dataSource = 'static-json';
    environment.movieApi.staticMoviesUrl = '/test-movies.json';
    const service = TestBed.inject(MovieService);

    service.loadMovies();

    const request = httpTesting.expectOne('/test-movies.json');
    request.flush([
      {
        id: 101,
        title: 'Static JSON Movie',
        year: 2026,
        genre: 'Drama',
        rating: 7.2,
        description: 'Loaded from a local JSON-like API source.',
        posterUrl: 'https://placehold.co/640x420/111827/f8fafc?text=Static',
        director: 'Static Source',
        duration: '100 min',
      },
    ]);

    expect(service.getMovies()[0].title).toBe('Static JSON Movie');
    expect(service.sourceLabel()).toBe('Static JSON asset');
    expect(service.loading()).toBe(false);
  });

  it('should fall back to local movies when the configured remote source fails', () => {
    environment.movieApi.dataSource = 'static-json';
    environment.movieApi.staticMoviesUrl = '/broken-movies.json';
    const service = TestBed.inject(MovieService);

    service.loadMovies();

    const request = httpTesting.expectOne('/broken-movies.json');
    request.flush('nope', { status: 500, statusText: 'Server Error' });

    expect(service.getMovieById(1)?.title).toBe('Interstellar');
    expect(service.sourceLabel()).toBe('Local fallback data');
    expect(service.errorMessage()).toContain('Could not load remote movies');
  });
});

