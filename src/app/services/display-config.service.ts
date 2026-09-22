import { Injectable, signal } from '@angular/core';
import { DEFAULT_DISPLAY_CONFIG, DisplayConfig } from '../models/display-config';

const DISPLAY_CONFIG_STORAGE_KEY = 'movie-explorer-display-config';

@Injectable({ providedIn: 'root' })
export class DisplayConfigService {
  // ANGULAR LEARNING: Signal state persisted through one service.
  private readonly displayConfigState = signal<DisplayConfig>(this.readDisplayConfig());

  readonly displayConfig = this.displayConfigState.asReadonly();

  updateSetting(key: keyof DisplayConfig, value: boolean): void {
    const nextConfig = {
      ...this.displayConfigState(),
      [key]: value,
    };

    this.displayConfigState.set(nextConfig);
    this.saveDisplayConfig(nextConfig);
  }

  resetToDefaults(): void {
    this.displayConfigState.set(DEFAULT_DISPLAY_CONFIG);
    this.saveDisplayConfig(DEFAULT_DISPLAY_CONFIG);
  }

  private readDisplayConfig(): DisplayConfig {
    try {
      const storedValue = localStorage.getItem(DISPLAY_CONFIG_STORAGE_KEY);
      return storedValue
        ? { ...DEFAULT_DISPLAY_CONFIG, ...JSON.parse(storedValue) as Partial<DisplayConfig> }
        : DEFAULT_DISPLAY_CONFIG;
    } catch {
      return DEFAULT_DISPLAY_CONFIG;
    }
  }

  private saveDisplayConfig(config: DisplayConfig): void {
    try {
      localStorage.setItem(DISPLAY_CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage can fail in restricted browser modes; the signal still updates for this session.
    }
  }
}
