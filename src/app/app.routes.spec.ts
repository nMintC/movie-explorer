import { routes } from './app.routes';
import { validMovieIdGuard } from './guards/valid-movie-id.guard';

describe('app routes', () => {
  it('should lazy load visible page routes', () => {
    const visibleRoutes = routes.filter((route) => route.path !== '**');

    expect(visibleRoutes.length).toBe(5);
    expect(visibleRoutes.every((route) => typeof route.loadComponent === 'function')).toBe(true);
  });

  it('should guard the movie detail route', () => {
    const detailRoute = routes.find((route) => route.path === 'movies/:id');

    expect(detailRoute?.canActivate).toContain(validMovieIdGuard);
  });
});
