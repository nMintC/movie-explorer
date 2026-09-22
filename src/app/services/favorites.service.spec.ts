import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should toggle favorites and update the computed count', () => {
    const service = TestBed.inject(FavoritesService);

    service.toggleFavorite(3);

    expect(service.isFavorite(3)).toBeTrue();
    expect(service.favoriteCount()).toBe(1);

    service.toggleFavorite(3);

    expect(service.isFavorite(3)).toBeFalse();
    expect(service.favoriteCount()).toBe(0);
  });

  it('should read persisted favorite ids from localStorage', () => {
    localStorage.setItem('movie-explorer-favorites', JSON.stringify([2, 5]));

    const service = TestBed.inject(FavoritesService);

    expect(service.favoriteIds()).toEqual([2, 5]);
  });
});
