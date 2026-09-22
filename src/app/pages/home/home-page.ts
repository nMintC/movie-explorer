import { Component, computed, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid';
import { DisplayConfigService } from '../../services/display-config.service';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, MovieGridComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent {
  protected readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly displayConfigService = inject(DisplayConfigService);

  protected readonly featuredMovies = computed(() => this.movieService.getFeaturedMovies());
  protected readonly topRatedMovies = computed(() => this.movieService.getTopRatedMovies(6));
  protected readonly recommendedMovies = computed(() => this.movieService.getRecommendedMovies(6));

  constructor() {
    this.movieService.loadMovies();
  }

  toggleFavorite(movieId: number): void {
    this.favoritesService.toggleFavorite(movieId);
  }
}
