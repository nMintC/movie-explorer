import { TestBed } from '@angular/core/testing';
import { DisplayConfigService } from './display-config.service';

describe('DisplayConfigService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should update and persist display configuration', () => {
    const service = TestBed.inject(DisplayConfigService);

    service.updateSetting('hero', false);

    expect(service.displayConfig().hero).toBeFalse();
    expect(localStorage.getItem('movie-explorer-display-config')).toContain('"hero":false');
  });

  it('should reset display configuration to defaults', () => {
    const service = TestBed.inject(DisplayConfigService);

    service.updateSetting('recommendations', false);
    service.resetToDefaults();

    expect(service.displayConfig().recommendations).toBeTrue();
  });
});
