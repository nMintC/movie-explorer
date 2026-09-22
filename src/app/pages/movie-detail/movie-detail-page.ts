import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail-page',
  imports: [RouterLink],
  templateUrl: './movie-detail-page.html',
  styleUrl: './movie-detail-page.css'
})
export class MovieDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);

  // ANGULAR LEARNING: Route parameters identify which movie to load.
  protected readonly movieId = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly movie = this.movieService.getMovieById(this.movieId);

  toggleFavorite(): void {
    if (this.movie) {
      this.favoritesService.toggleFavorite(this.movie.id);
    }
  }

  useFallbackPoster(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = 'https://placehold.co/900x540/111827/f8fafc?text=Movie';
  }
}
