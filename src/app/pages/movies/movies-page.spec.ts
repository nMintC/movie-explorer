import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MoviesPageComponent } from './movies-page';

describe('MoviesPageComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [MoviesPageComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should paginate movie results', () => {
    const fixture = TestBed.createComponent(MoviesPageComponent);
    const component = fixture.componentInstance as any;

    expect(component.totalPages()).toBeGreaterThanOrEqual(3);
    expect(component.visibleMovies().length).toBe(10);

    component.goToPage(2);

    expect(component.currentPage()).toBe(2);
  });

  it('should reset pagination when filters change', () => {
    const fixture = TestBed.createComponent(MoviesPageComponent);
    const component = fixture.componentInstance as any;

    component.goToPage(2);
    component.updateFilters({ searchText: 'matrix', genre: 'All', sort: 'rating-desc' });

    expect(component.currentPage()).toBe(1);
    expect(component.filteredMovies()[0].title).toBe('The Matrix');
  });
});
