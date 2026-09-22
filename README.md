# Movie Explorer

Movie Explorer is a focused Angular learning project. It uses local mock movie data to demonstrate modern Angular fundamentals without requiring a backend, database, authentication, or third-party API key.

## What It Demonstrates

- Standalone components
- Component templates and styling
- Parent-to-child inputs
- Child-to-parent outputs
- Angular Router
- Route parameters
- Services and Dependency Injection
- Signals and computed state
- Reactive Forms
- localStorage persistence
- Modern `@if` and `@for` control flow
- Configurable Home page content blocks

## Routes

- `/` - Home page with configurable content blocks
- `/movies` - Search, filter, sort, and paginate movies
- `/movies/:id` - Movie detail page using a route parameter
- `/favorites` - Persisted favorite movies
- `/settings` - Display configuration toggles

## Run Locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:4200/
```

## Useful Commands

```bash
npm run build
npm test -- --watch=false
```

## Data Source

The app uses mock data from `src/app/data/movies.ts`.

A small local JSON file exists at `public/movies-api-sample.json` to show where an `HttpClient` data source could be introduced later without requiring external credentials.

## Learning Notes

See `ANGULAR_LEARNING_NOTES.md` for the phase-by-phase explanation of the Angular concepts used in this project.
