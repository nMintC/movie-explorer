import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(MovieService);
  });

  it('should retrieve a movie by id', () => {
    expect(service.getMovieById(1)?.title).toBe('Interstellar');
  });

  it('should search movies by title', () => {
    const results = service.searchMovies({ searchText: 'inception', genre: 'All', sort: 'rating-desc' });

    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Inception');
  });

  it('should filter by genre and sort newest first', () => {
    const results = service.searchMovies({ searchText: '', genre: 'Animation', sort: 'newest' });

    expect(results.length).toBeGreaterThan(1);
    expect(results.every((movie) => movie.genre === 'Animation')).toBeTrue();
    expect(results[0].year).toBeGreaterThanOrEqual(results[1].year);
  });
});
