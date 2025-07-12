import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  darkMode = inject(DarkModeService);
  router = inject(Router);
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 640) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('nav')) return;
    this.closeMenu();
  }

  @HostListener('window:popstate')
  @HostListener('window:hashchange')
  @HostListener('window:load')
  onRouteChange() {
    this.closeMenu();
  }

}
