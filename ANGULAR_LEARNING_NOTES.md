# Phase 1 - Angular Fundamentals

## 1. AppComponent

`AppComponent` is located at `src/app/app.ts`.

It is responsible for the main Movie Explorer page: the header text, search UI, local mock movie data, filtering logic, and the list of movie cards.

Its template file is `src/app/app.html`.

The state it currently owns is:

- `appTitle`
- `subtitle`
- `searchText`
- `movies`
- `filteredMovies`

## 2. MovieCardComponent

`MovieCardComponent` is located at `src/app/movie-card/movie-card.ts`.

Its responsibility is to display one movie card.

It receives one `movie` object from `AppComponent` through this input:

```ts
@Input({ required: true }) movie!: Movie;
```

## 3. Component Tree

```text
AppComponent
|-- MovieCardComponent
```

`AppComponent` is the parent component. It owns the movie list and decides which movies should be shown.

`MovieCardComponent` is the child component. It receives one movie from the parent and displays that movie.

## 4. Data Binding

### Interpolation

Interpolation displays component values inside the template.

Real examples from `src/app/app.html`:

```html
<h1>{{ appTitle }}</h1>
<p>{{ subtitle }}</p>
```

Real example from `src/app/movie-card/movie-card.html`:

```html
<h2>{{ movie.title }}</h2>
```

### Property Binding

Property binding sends a component value into an HTML property or a child component input.

Real example from `src/app/app.html`:

```html
<app-movie-card [movie]="movie" />
```

Real examples from `src/app/movie-card/movie-card.html`:

```html
<img class="poster" [src]="movie.posterUrl" [alt]="movie.title + ' poster'" />
```

### Event Binding

Event binding runs component methods when the user does something.

Real examples from `src/app/app.html`:

```html
(input)="updateSearchText(searchInput.value)"
(click)="searchMovies()"
(click)="clearSearch()"
```

## 5. Component State

Component state means values stored by a component that affect what the user sees.

Current `AppComponent` state in `src/app/app.ts`:

- `appTitle`: page title
- `subtitle`: page subtitle
- `searchText`: what the user typed into the search box
- `movies`: the full local mock movie list
- `filteredMovies`: the movie list currently shown on the page

## 6. `@for`

`@for` is used in `src/app/app.html`:

```html
@for (movie of filteredMovies; track movie.id) {
  <app-movie-card [movie]="movie" />
}
```

Angular repeats the `app-movie-card` element once for each movie in `filteredMovies`.

`track movie.id` helps Angular identify each movie by its unique `id`.

## 7. `@if`

`@if` is used in `src/app/app.html`:

```html
@if (filteredMovies.length > 0) {
  ...
} @else {
  <section class="empty-state" aria-live="polite">
    <h2>No movies found.</h2>
    <p>Try another title or clear the search.</p>
  </section>
}
```

It is needed because the page should show movie cards when matches exist and a friendly empty message when no matches exist.

## 8. Data flow

```text
User types search
|
AppComponent updates searchText
|
User clicks Search
|
AppComponent updates filteredMovies
|
template re-renders
|
MovieCardComponent receives movie data
|
UI updates
```

This phase uses only local mock data. There is no backend, API, service, routing, signals, or storage yet.
