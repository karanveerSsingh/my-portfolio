import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
})
export class ScrollTopComponent {
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 400);
  }

  scrollUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
