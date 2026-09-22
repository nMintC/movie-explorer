import { Component, inject } from '@angular/core';
import { DisplaySettingsComponent } from '../../components/display-settings/display-settings';
import { DisplayConfig } from '../../models/display-config';
import { DisplayConfigService } from '../../services/display-config.service';

@Component({
  selector: 'app-settings-page',
  imports: [DisplaySettingsComponent],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css'
})
export class SettingsPageComponent {
  protected readonly displayConfigService = inject(DisplayConfigService);

  updateDisplaySetting(change: { key: keyof DisplayConfig; value: boolean }): void {
    this.displayConfigService.updateSetting(change.key, change.value);
  }

  resetDisplaySettings(): void {
    this.displayConfigService.resetToDefaults();
  }
}
