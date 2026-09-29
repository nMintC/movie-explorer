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

# Phase 8 - API-Ready HttpClient Architecture

## Configured Movie Data Sources

The app still works from local mock data by default, but `MovieService` now has a clear place for alternative movie sources.

Inspect:

- `src/app/services/movie.service.ts`
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `public/movies-api-sample.json`

Example:

```ts
export const environment = {
  movieApi: {
    dataSource: 'mock',
    staticMoviesUrl: '/movies-api-sample.json',
    tmdbBaseUrl: 'https://api.themoviedb.org/3',
    tmdbApiKey: '',
  },
};
```

Data flow:

```text
environment.movieApi.dataSource
|
MovieService.loadMovies()
|
mock data, static JSON, or optional TMDB path
|
if remote fails, local MOVIES fallback is used
```

The default source is `mock`, so no API key or backend server is required.

## Safe Fallback

Remote loading errors do not break the app.

Inspect: `src/app/services/movie.service.ts`

Example:

```ts
catchError(() => {
  this.errorMessageState.set('Could not load remote movies. Showing local fallback data.');
  this.sourceLabelState.set('Local fallback data');
  return of(MOVIES);
})
```

# Phase 9 - Loading And Error State

## Async UI State

`MovieService` exposes signals for loading, error, and active source label.

Inspect: `src/app/services/movie.service.ts`

Example:

```ts
readonly loading = this.loadingState.asReadonly();
readonly errorMessage = this.errorMessageState.asReadonly();
readonly sourceLabel = this.sourceLabelState.asReadonly();
```

The pages read these signals and show beginner-friendly status messages.

Inspect:

- `src/app/pages/movies/movies-page.html`
- `src/app/pages/home/home-page.html`
- `src/app/pages/movie-detail/movie-detail-page.html`
- `src/app/components/movie-grid/movie-grid.html`

Example:

```html
@if (isLoading()) {
  <p class="state-message loading" aria-live="polite">Loading movies...</p>
}
```

# Phase 10 - Lazy-Loaded Routes And Guards

## Lazy-Loaded Routes

Routes now use `loadComponent`, so each page can be loaded as its own route chunk.

Inspect: `src/app/app.routes.ts`

Example:

```ts
{
  path: 'movies',
  loadComponent: () => import('./pages/movies/movies-page').then((m) => m.MoviesPageComponent),
}
```

Build output shows separate lazy chunks for pages such as `movies-page`, `home-page`, and `movie-detail-page`.

## Route Guard

A route guard validates the movie detail route parameter before Angular activates the detail page.

Inspect: `src/app/guards/valid-movie-id.guard.ts`

Example:

```ts
export const validMovieIdGuard: CanActivateFn = (route) => {
  const movieId = Number(route.paramMap.get('id'));
  return Number.isInteger(movieId) && movieId > 0 ? true : inject(Router).parseUrl('/movies');
};
```

Data flow:

```text
User opens /movies/abc
|
validMovieIdGuard checks id
|
invalid id redirects to /movies
```

A numeric but unknown id, such as `/movies/999`, still reaches the detail page and shows the existing Movie not found state.

# Phase 11 - HTTP Interceptor

## Shared HTTP Behavior

The app uses a functional HTTP interceptor to add common behavior to outgoing HTTP requests.

Inspect:

- `src/app/interceptors/movie-api.interceptor.ts`
- `src/app/app.config.ts`

Example:

```ts
provideHttpClient(withInterceptors([movieApiInterceptor]))
```

The interceptor adds a learning-project header to requests and applies the configured request timeout.

For future TMDB requests, it can attach the bearer token only when `tmdbApiKey` is configured. No secrets are committed.

# Phase 12 - Environment And Configuration Management

## Environment Files

The project now has environment files for API configuration.

Inspect:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `angular.json`

Production builds replace `environment.ts` with `environment.prod.ts` through `fileReplacements`.

The app stays credential-free because `tmdbApiKey` is an empty string by default and `dataSource` is `mock`.

## New Tests

Additional tests cover the new architecture:

- `src/app/app.routes.spec.ts`: lazy routes and guarded detail route
- `src/app/guards/valid-movie-id.guard.spec.ts`: valid and invalid route parameters
- `src/app/interceptors/movie-api.interceptor.spec.ts`: shared HTTP header
- `src/app/services/movie.service.spec.ts`: static JSON loading and fallback behavior

# Frontend Design - Visual Foundation

This iteration adds a small CSS design system without changing Angular behavior. The shared tokens live in src/styles.css and are available to every component stylesheet.

## Design Tokens

Design tokens are named values for decisions that repeat across an interface. Semantic names make the role clear and make future visual changes safer than scattering unrelated hex values through components.

Examples from this project:

    --color-bg: #080a0f;
    --color-surface: #10151f;
    --color-text-primary: #f4f1ea;
    --color-accent: #d7a85f;
    --space-4: 16px;
    --radius-md: 8px;

Semantic color tokens explain intent. --color-text-secondary is easier to maintain than many slightly different gray values. The palette is intentionally restrained so the interface feels like a quiet cinematic library rather than a dashboard.

## Spacing And Rhythm

The project uses a small spacing scale:

    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;
    --space-8: 64px;

A scale creates a consistent visual rhythm between page sections, panels, controls, and card content. It is a guide, not a rule that every layout-specific number must be removed.

## Typography Hierarchy

Typography now uses a small hierarchy built from the same font family and a few weights:

- 400 for normal body text
- 500 for labels and metadata
- 600 for card and section titles
- 700 for major page headings

Fewer weights usually create clearer hierarchy than making every piece of text heavy. Shared line-height tokens also make paragraphs and headings easier to scan.

## Surfaces, Borders, And Interaction

Panels and cards use --color-surface, --color-surface-raised, and --color-border to create depth through contrast. This is quieter and more predictable than adding a strong shadow to every card.

The project keeps only a subtle shadow token and uses one shared focus treatment:

    --focus-outline: 2px solid var(--color-accent);

Hover, focus-visible, selected, and disabled states now use the same accent and surface roles. Focus remains visible for keyboard users without bright teal outlines appearing everywhere.

## Angular Architecture Versus CSS Design

Angular and CSS solve different problems:

| Project concern | Main concept | Example |
| --- | --- | --- |
| Reusable UI behavior | Angular component | MovieCardComponent |
| Shared application state | Angular service and signals | FavoritesService |
| Conditional rendering | Angular template control flow | @if in Home |
| Visual values reused across CSS | CSS custom properties | --color-surface |
| Responsive layout | CSS media queries and grid | .movie-grid |
| Keyboard focus appearance | CSS pseudo-class | :focus-visible |

The Angular architecture controls data flow, routing, state, and rendering. CSS custom properties are browser-level styling tools used by those components. Keeping those responsibilities separate makes both the learning path and future redesigns easier to understand.
