import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, provideRouter } from '@angular/router';
import { validMovieIdGuard } from './valid-movie-id.guard';

function createRouteSnapshot(id: string): ActivatedRouteSnapshot {
  const snapshot = new ActivatedRouteSnapshot();
  snapshot.params = { id };
  return snapshot;
}

describe('validMovieIdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('should allow positive numeric movie ids', () => {
    const result = TestBed.runInInjectionContext(() => validMovieIdGuard(createRouteSnapshot('3'), {} as any));

    expect(result).toBe(true);
  });

  it('should redirect invalid movie ids to the movies page', () => {
    const router = TestBed.inject(Router);
    const result = TestBed.runInInjectionContext(() => validMovieIdGuard(createRouteSnapshot('abc'), {} as any));

    expect(router.serializeUrl(result as any)).toBe('/movies');
  });
});
