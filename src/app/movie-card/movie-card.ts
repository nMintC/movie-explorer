import { Component, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
// ANGULAR LEARNING: This file defines MovieCardComponent.
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
}
