import { Component, input, output } from '@angular/core';
import { DisplayConfig } from '../../models/display-config';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.html',
  styleUrl: './display-settings.css'
})
export class DisplaySettingsComponent {
  readonly config = input.required<DisplayConfig>();
  readonly settingChanged = output<{ key: keyof DisplayConfig; value: boolean }>();
  readonly resetRequested = output<void>();

  updateSetting(key: keyof DisplayConfig, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.settingChanged.emit({ key, value: checkbox.checked });
  }
}
