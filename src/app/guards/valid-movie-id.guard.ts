import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const validMovieIdGuard: CanActivateFn = (route) => {
  // ANGULAR LEARNING: Route Guard protects a route from invalid URL parameters.
  const movieId = Number(route.paramMap.get('id'));

  if (Number.isInteger(movieId) && movieId > 0) {
    return true;
  }

  return inject(Router).parseUrl('/movies');
};
