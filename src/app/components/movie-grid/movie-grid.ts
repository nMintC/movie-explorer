import { Component, input, output } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-grid',
  imports: [MovieCardComponent],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css'
})
export class MovieGridComponent {
  readonly title = input('');
  readonly movies = input.required<Movie[]>();
  readonly favoriteIds = input<number[]>([]);
  readonly emptyMessage = input('No movies found.');
  readonly favoriteToggled = output<number>();

  isFavorite(movieId: number): boolean {
    return this.favoriteIds().includes(movieId);
  }
}
