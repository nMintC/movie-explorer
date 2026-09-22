import { Component, inject } from '@angular/core';
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
  private readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly displayConfigService = inject(DisplayConfigService);

  protected readonly featuredMovies = this.movieService.getFeaturedMovies();
  protected readonly topRatedMovies = this.movieService.getTopRatedMovies(6);
  protected readonly recommendedMovies = this.movieService.getRecommendedMovies(6);

  toggleFavorite(movieId: number): void {
    this.favoritesService.toggleFavorite(movieId);
  }
}
