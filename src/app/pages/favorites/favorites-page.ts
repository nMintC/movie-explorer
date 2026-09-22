import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favorites-page',
  imports: [MovieGridComponent, RouterLink],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css'
})
export class FavoritesPageComponent {
  private readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);

  protected readonly favoriteMovies = computed(() => {
    const favoriteIds = this.favoritesService.favoriteIds();
    return this.movieService.getMovies().filter((movie) => favoriteIds.includes(movie.id));
  });

  toggleFavorite(movieId: number): void {
    this.favoritesService.toggleFavorite(movieId);
  }
}
