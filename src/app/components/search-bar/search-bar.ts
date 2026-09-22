import { Component, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MOVIE_GENRES, MovieGenre } from '../../models/movie';
import { MovieSort } from '../../services/movie.service';

export interface SearchFilters {
  searchText: string;
  genre: MovieGenre | 'All';
  sort: MovieSort;
}

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent implements OnInit {
  readonly filtersChanged = output<SearchFilters>();
  protected readonly genres = ['All', ...MOVIE_GENRES];

  // ANGULAR LEARNING: Reactive Forms for related user inputs.
  protected readonly filtersForm = new FormGroup({
    searchText: new FormControl('', { nonNullable: true }),
    genre: new FormControl<MovieGenre | 'All'>('All', { nonNullable: true }),
    sort: new FormControl<MovieSort>('rating-desc', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.emitFilters();
    this.filtersForm.valueChanges.subscribe(() => this.emitFilters());
  }

  clearSearch(): void {
    this.filtersForm.patchValue({ searchText: '', genre: 'All', sort: 'rating-desc' });
  }

  private emitFilters(): void {
    const value = this.filtersForm.getRawValue();
    this.filtersChanged.emit(value);
  }
}
