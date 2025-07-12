import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly document = inject(DOCUMENT);
  isDarkMode = signal<boolean>(localStorage['theme'] === "dark");

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
    let theme: string = this.isDarkMode() ? 'dark' : 'light';
    localStorage['theme'] = theme;
  }
}
