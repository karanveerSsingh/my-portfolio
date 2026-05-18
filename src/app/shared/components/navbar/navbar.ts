import { Component, HostListener, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  themeSvc = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  scrolled = signal(false);
  menuOpen = signal(false);

  constructor() {
    // Lock body scroll when mobile menu is open
    effect(() => {
      const open = this.menuOpen();
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 30);
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }

  scrollTo(id: string) {
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleTheme() {
    this.themeSvc.toggle();
  }
}
