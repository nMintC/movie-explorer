import { Routes } from '@angular/router';
import { validMovieIdGuard } from './guards/valid-movie-id.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Movie Explorer - Home',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePageComponent),
  },
  {
    path: 'movies',
    title: 'Movie Explorer - Movies',
    loadComponent: () => import('./pages/movies/movies-page').then((m) => m.MoviesPageComponent),
  },
  {
    path: 'movies/:id',
    title: 'Movie Explorer - Movie Detail',
    canActivate: [validMovieIdGuard],
    loadComponent: () => import('./pages/movie-detail/movie-detail-page').then((m) => m.MovieDetailPageComponent),
  },
  {
    path: 'favorites',
    title: 'Movie Explorer - Favorites',
    loadComponent: () => import('./pages/favorites/favorites-page').then((m) => m.FavoritesPageComponent),
  },
  {
    path: 'settings',
    title: 'Movie Explorer - Settings',
    loadComponent: () => import('./pages/settings/settings-page').then((m) => m.SettingsPageComponent),
  },
  { path: '**', redirectTo: '' },
];
