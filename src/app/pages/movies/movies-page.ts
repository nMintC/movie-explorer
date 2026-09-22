import { Component, computed, inject, signal } from '@angular/core';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid';
import { SearchBarComponent, SearchFilters } from '../../components/search-bar/search-bar';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-movies-page',
  imports: [MovieGridComponent, SearchBarComponent],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.css'
})
export class MoviesPageComponent {
  protected readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);

  // ANGULAR LEARNING: Signal state for user-controlled UI state.
  protected readonly filters = signal<SearchFilters>({
    searchText: '',
    genre: 'All',
    sort: 'rating-desc',
  });
  protected readonly currentPage = signal(1);
  protected readonly pageSize = PAGE_SIZE;

  // ANGULAR LEARNING: computed() keeps derived values in sync.
  protected readonly filteredMovies = computed(() => this.movieService.searchMovies(this.filters()));
  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredMovies().length / this.pageSize)));
  protected readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));
  protected readonly visibleMovies = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredMovies().slice(startIndex, startIndex + this.pageSize);
  });

  constructor() {
    this.movieService.loadMovies();
  }

  updateFilters(filters: SearchFilters): void {
    this.filters.set(filters);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  toggleFavorite(movieId: number): void {
    this.favoritesService.toggleFavorite(movieId);
  }
}
