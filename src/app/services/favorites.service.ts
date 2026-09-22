import { computed, Injectable, signal } from '@angular/core';

const FAVORITES_STORAGE_KEY = 'movie-explorer-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // ANGULAR LEARNING: Signal state
  private readonly favoriteIdsState = signal<number[]>(this.readFavoriteIds());

  readonly favoriteIds = this.favoriteIdsState.asReadonly();

  // ANGULAR LEARNING: computed() derives state from a signal.
  readonly favoriteCount = computed(() => this.favoriteIdsState().length);

  isFavorite(movieId: number): boolean {
    return this.favoriteIdsState().includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    const currentIds = this.favoriteIdsState();
    const nextIds = currentIds.includes(movieId)
      ? currentIds.filter((id) => id !== movieId)
      : [...currentIds, movieId];

    this.favoriteIdsState.set(nextIds);
    this.saveFavoriteIds(nextIds);
  }

  private readFavoriteIds(): number[] {
    try {
      const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) as number[] : [];
    } catch {
      return [];
    }
  }

  private saveFavoriteIds(ids: number[]): void {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage can fail in restricted browser modes; the signal still updates for this session.
    }
  }
}
