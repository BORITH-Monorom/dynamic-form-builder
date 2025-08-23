import { computed, effect, Injectable, signal } from '@angular/core';
import { startViewTransition } from '../utils/view-transition';
export interface Theme {
  name: ThemeName;
  icon: ThemeIcon;
}

export type ThemeName = 'Light' | 'Dark' | 'System';
export type ThemeIcon = 'light_mode' | 'dark_mode' | 'desktop_windows';

const THEMES: Theme[] = [
  { name: 'Light', icon: 'light_mode' },
  { name: 'Dark', icon: 'dark_mode' },
  { name: 'System', icon: 'desktop_windows' },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly themes: Theme[] = THEMES;
  private _current_theme = signal<Theme>(this.themes[2]);
  public readonly get_current_theme = this._current_theme.asReadonly();

  constructor() {
    // The effect can be placed in the constructor for a clean setup
    effect(() => {
      const currentTheme = this._current_theme();
      const colorScheme =
        currentTheme.name === 'System' ? 'light dark' : currentTheme.name;

      //Use the utility function for a smooth transition
      startViewTransition(() => {
        document.body.style.colorScheme = colorScheme;
      });
    });
  }
  setTheme(name: Theme): void {
    const theme = this.themes.find((t) => t.name === name.name);
    if (theme) {
      this._current_theme.set(theme);
    }
  }
}
