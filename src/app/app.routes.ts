import { Routes } from '@angular/router';
import { FavoritesPageComponent } from './pages/favorites/favorites-page';
import { HomePageComponent } from './pages/home/home-page';
import { MovieDetailPageComponent } from './pages/movie-detail/movie-detail-page';
import { MoviesPageComponent } from './pages/movies/movies-page';
import { SettingsPageComponent } from './pages/settings/settings-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Movie Explorer - Home' },
  { path: 'movies', component: MoviesPageComponent, title: 'Movie Explorer - Movies' },
  { path: 'movies/:id', component: MovieDetailPageComponent, title: 'Movie Explorer - Movie Detail' },
  { path: 'favorites', component: FavoritesPageComponent, title: 'Movie Explorer - Favorites' },
  { path: 'settings', component: SettingsPageComponent, title: 'Movie Explorer - Settings' },
  { path: '**', redirectTo: '' },
];
