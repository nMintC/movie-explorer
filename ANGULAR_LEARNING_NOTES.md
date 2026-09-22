# Movie Explorer - Angular Learning Notes

This project is organized as phased Angular learning material. Each phase below documents only concepts that are actually used in the current codebase.

## Current Component Tree

```text
AppComponent
|
|-- NavbarComponent
|
`-- RouterOutlet
    |
    |-- HomePageComponent
    |   |-- HeroComponent
    |   `-- MovieGridComponent
    |       `-- MovieCardComponent
    |
    |-- MoviesPageComponent
    |   |-- SearchBarComponent
    |   `-- MovieGridComponent
    |       `-- MovieCardComponent
    |
    |-- MovieDetailPageComponent
    |
    |-- FavoritesPageComponent
    |   `-- MovieGridComponent
    |       `-- MovieCardComponent
    |
    `-- SettingsPageComponent
        `-- DisplaySettingsComponent
```

## Major Data Flow

Movie browsing:

```text
MovieService
|
MoviesPageComponent
|
MovieGridComponent
|
MovieCardComponent
```

Configurable Home sections:

```text
SettingsPageComponent
|
DisplayConfigService signal state
|
localStorage
|
HomePageComponent
|
@if
|
show/hide content block
```

Favorites:

```text
MovieCardComponent favorite button
|
favoriteToggled output
|
MovieGridComponent
|
Page component
|
FavoritesService signal state
|
localStorage
```

# Phase 1 - Angular Fundamentals

## Component

A component is a reusable UI building block with TypeScript, HTML, and CSS.

Why this project uses it: each major UI area is easier to study when it lives in a focused component.

Inspect:

- `src/app/app.ts`
- `src/app/components/movie-card/movie-card.ts`

Example:

```ts
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCardComponent {}
```

## Template

A template is the HTML connected to a component.

Inspect: `src/app/components/movie-card/movie-card.html`

Example:

```html
<h3>{{ movie().title }}</h3>
```

## Interpolation

Interpolation prints component values in the template.

Inspect: `src/app/components/movie-card/movie-card.html`

Example:

```html
<p class="meta">{{ movie().year }} | {{ movie().genre }}</p>
```

## Property Binding

Property binding passes a value into an HTML property or component input.

Inspect: `src/app/components/movie-card/movie-card.html`

Example:

```html
<img [src]="movie().posterUrl" [alt]="movie().title + ' poster'" />
```

## Event Binding

Event binding runs code when a user action happens.

Inspect: `src/app/components/movie-card/movie-card.html`

Example:

```html
<button type="button" (click)="toggleFavorite($event)">
```

## `@for`

`@for` repeats UI for a list.

Inspect: `src/app/components/movie-grid/movie-grid.html`

Example:

```html
@for (movie of movies(); track movie.id) {
  <app-movie-card [movie]="movie" />
}
```

Angular renders one movie card for each movie and tracks each item by `movie.id`.

## `@if`

`@if` conditionally renders UI.

Inspect: `src/app/pages/home/home-page.html`

Example:

```html
@if (displayConfigService.displayConfig().hero) {
  <app-hero />
}
```

This is important for the mentor requirement because hidden Home sections are not rendered.

# Phase 2 - Component Architecture

## Parent / Child Components

Parent components pass data down to child components.

Inspect:

- `src/app/components/movie-grid/movie-grid.html`
- `src/app/components/movie-card/movie-card.ts`

Example:

```html
<app-movie-card [movie]="movie" [isFavorite]="isFavorite(movie.id)" />
```

## Input

Inputs let a child component receive data.

Inspect: `src/app/components/movie-card/movie-card.ts`

Example:

```ts
readonly movie = input.required<Movie>();
readonly isFavorite = input(false);
```

## Output

Outputs let a child component notify a parent about an event.

Inspect: `src/app/components/movie-card/movie-card.ts`

Example:

```ts
readonly favoriteToggled = output<number>();
```

Data flow:

```text
MovieCardComponent emits favoriteToggled
|
MovieGridComponent forwards the event
|
Page component calls FavoritesService
```

## Separation Of Responsibilities

`AppComponent` is now lightweight.

Inspect: `src/app/app.ts`

Example:

```ts
export class AppComponent {}
```

Movie data and search behavior moved into `MovieService`, while pages coordinate the UI.

# Phase 3 - Routing

## RouterOutlet

`RouterOutlet` renders the active route component.

Inspect: `src/app/app.html`

Example:

```html
<router-outlet />
```

## RouterLink And RouterLinkActive

`RouterLink` navigates without a full page reload. `RouterLinkActive` styles the active nav item.

Inspect: `src/app/components/navbar/navbar.html`

Example:

```html
<a routerLink="/movies" routerLinkActive="active">Movies</a>
```

## Route Parameters

Route parameters read dynamic URL values.

Inspect:

- `src/app/app.routes.ts`
- `src/app/pages/movie-detail/movie-detail-page.ts`

Example:

```ts
protected readonly movieId = Number(this.route.snapshot.paramMap.get('id'));
```

Data flow:

```text
/movies/3
|
ActivatedRoute reads id
|
MovieService.getMovieById(3)
|
MovieDetailPageComponent displays the movie
```

# Phase 4 - Services And Dependency Injection

## MovieService

`MovieService` centralizes movie access and filtering.

Inspect: `src/app/services/movie.service.ts`

Example:

```ts
getMovieById(id: number): Movie | undefined {
  return this.movies.find((movie) => movie.id === id);
}
```

Why data moved from `AppComponent`: the root component should be the shell, while movie behavior belongs in a dedicated service and feature pages.

## Dependency Injection

Dependency Injection gives components access to shared services.

Inspect: `src/app/pages/movies/movies-page.ts`

Example:

```ts
private readonly movieService = inject(MovieService);
```

## HttpClient Architecture

The app still uses local mock data, but `MovieService` includes a local JSON example to show where API loading can fit later.

Inspect:

- `src/app/services/movie.service.ts`
- `public/movies-api-sample.json`

Example:

```ts
getMoviesFromStaticJson(): Observable<Movie[]> {
  return this.http.get<Movie[]>('/movies-api-sample.json');
}
```

No API key is required.

# Phase 5 - Signals And State

## signal

A signal stores reactive state.

Inspect: `src/app/services/favorites.service.ts`

Example:

```ts
private readonly favoriteIdsState = signal<number[]>(this.readFavoriteIds());
```

## computed

`computed()` derives a value from signals.

Inspect: `src/app/services/favorites.service.ts`

Example:

```ts
readonly favoriteCount = computed(() => this.favoriteIdsState().length);
```

Why signals are useful here: favorites and display settings can change from different pages, and the UI updates when signal values change.

# Phase 6 - Persistence

## localStorage

`localStorage` persists small browser-side settings after refresh.

Inspect:

- `src/app/services/favorites.service.ts`
- `src/app/services/display-config.service.ts`

Example:

```ts
localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
```

Persistence is centralized in services so components do not directly talk to browser storage.

# Phase 7 - Forms / Search / Filtering

## Reactive Forms

Reactive Forms group related user inputs in TypeScript.

Inspect: `src/app/components/search-bar/search-bar.ts`

Example:

```ts
protected readonly filtersForm = new FormGroup({
  searchText: new FormControl('', { nonNullable: true }),
  genre: new FormControl<MovieGenre | 'All'>('All', { nonNullable: true }),
  sort: new FormControl<MovieSort>('rating-desc', { nonNullable: true }),
});
```

Data flow:

```text
User changes search/filter/sort
|
SearchBarComponent emits filtersChanged
|
MoviesPageComponent updates filter signal and resets page
|
computed filteredMovies recalculates
|
MovieGridComponent displays the current page
```

## Pagination

Pagination is handled in `MoviesPageComponent` using signal state and computed values.

Inspect: `src/app/pages/movies/movies-page.ts`

Example:

```ts
protected readonly visibleMovies = computed(() => {
  const startIndex = (this.currentPage() - 1) * this.pageSize;
  return this.filteredMovies().slice(startIndex, startIndex + this.pageSize);
});
```

# Mentor Requirement - Configurable Content Blocks

The requirement is implemented with:

- `src/app/models/display-config.ts`
- `src/app/services/display-config.service.ts`
- `src/app/pages/settings/settings-page.html`
- `src/app/pages/home/home-page.html`

The Settings page changes persisted configuration. The Home page uses `@if` to render or skip each block.

Example from `src/app/pages/home/home-page.html`:

```html
@if (displayConfigService.displayConfig().featuredMovies) {
  <app-movie-grid title="Featured Movies" [movies]="featuredMovies" />
}
```

This is conditional rendering, not CSS hiding.

# Tests

Important logic is covered in:

- `src/app/services/movie.service.spec.ts`: retrieval, search, genre filtering, sorting
- `src/app/services/favorites.service.spec.ts`: favorite toggling and persistence
- `src/app/services/display-config.service.spec.ts`: display settings and reset
- `src/app/pages/movies/movies-page.spec.ts`: pagination and filter reset
- `src/app/app.spec.ts`: shell rendering
