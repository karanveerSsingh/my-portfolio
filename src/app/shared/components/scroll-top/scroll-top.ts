import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  template: `
    <button
      class="scroll-top"
      [class.show]="visible()"
      (click)="scrollUp()"
      aria-label="Scroll to top"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  `,
  styles: [
    `
      .scroll-top {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--gradient);
        color: #fff;
        border: none;
        box-shadow: 0 10px 26px rgba(124, 92, 255, 0.45);
        opacity: 0;
        transform: translateY(20px) scale(0.7);
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 90;
        font-size: 16px;
      }
      .scroll-top.show {
        opacity: 1;
        transform: none;
        pointer-events: auto;
      }
      .scroll-top:hover {
        transform: translateY(-4px) scale(1.05);
      }
    `,
  ],
})
export class ScrollTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 400);
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
