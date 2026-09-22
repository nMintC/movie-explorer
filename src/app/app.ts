import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  imports: [MovieCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// ANGULAR LEARNING: This file defines AppComponent, the root component.
export class AppComponent {
  // ANGULAR LEARNING: Component state
  appTitle = 'Movie Explorer';
  subtitle = 'Discover movies and learn Angular';
  searchText = '';
  filteredMovies: Movie[] = [];

  // ANGULAR LEARNING: Component state with local mock data
  movies: Movie[] = [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      genre: 'Science Fiction',
      rating: 8.7,
      description: 'A team travels through a wormhole to search for a future home for humanity.',
      posterUrl: 'https://placehold.co/400x600/101828/f8fafc?text=Interstellar',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      rating: 9.0,
      description: 'Batman faces a criminal mastermind who tests Gotham and its heroes.',
      posterUrl: 'https://placehold.co/400x600/111827/facc15?text=The+Dark+Knight',
    },
    {
      id: 3,
      title: 'Inception',
      year: 2010,
      genre: 'Science Fiction',
      rating: 8.8,
      description: 'A thief enters dreams to plant an idea inside a target mind.',
      posterUrl: 'https://placehold.co/400x600/172554/e0f2fe?text=Inception',
    },
    {
      id: 4,
      title: 'Parasite',
      year: 2019,
      genre: 'Thriller',
      rating: 8.5,
      description: 'Two families become linked through a plan that reveals class tension.',
      posterUrl: 'https://placehold.co/400x600/27272a/fafafa?text=Parasite',
    },
    {
      id: 5,
      title: 'The Shawshank Redemption',
      year: 1994,
      genre: 'Drama',
      rating: 9.3,
      description: 'A banker builds hope and friendship during decades in prison.',
      posterUrl: 'https://placehold.co/400x600/3f3f46/fef3c7?text=Shawshank',
    },
    {
      id: 6,
      title: 'Spirited Away',
      year: 2001,
      genre: 'Animation',
      rating: 8.6,
      description: 'A young girl enters a magical world and works to save her parents.',
      posterUrl: 'https://placehold.co/400x600/064e3b/ecfdf5?text=Spirited+Away',
    },
  ];

  constructor() {
    this.filteredMovies = this.movies;
  }

  updateSearchText(value: string): void {
    this.searchText = value;
  }

  searchMovies(): void {
    const searchTerm = this.searchText.trim().toLowerCase();

    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm),
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredMovies = this.movies;
  }
}
