import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';
import { environment } from '../../environments/environment';

export const movieApiInterceptor: HttpInterceptorFn = (request, next) => {
  // ANGULAR LEARNING: HTTP Interceptor adds shared HTTP behavior in one place.
  let headers = request.headers.set('X-Movie-Explorer-Client', 'angular-learning-project');

  if (request.url.startsWith(environment.movieApi.tmdbBaseUrl) && environment.movieApi.tmdbApiKey) {
    headers = headers.set('Authorization', `Bearer ${environment.movieApi.tmdbApiKey}`);
  }

  return next(request.clone({ headers })).pipe(
    timeout(environment.movieApi.requestTimeoutMs),
  );
};
