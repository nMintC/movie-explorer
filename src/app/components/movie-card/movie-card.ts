import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
// ANGULAR LEARNING: Reusable child component with input() and output().
export class MovieCardComponent {
  readonly movie = input.required<Movie>();
  readonly isFavorite = input(false);
  readonly favoriteToggled = output<number>();

  toggleFavorite(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggled.emit(this.movie().id);
  }

  useFallbackPoster(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = 'https://placehold.co/640x420/111827/f8fafc?text=Movie';
  }
}
