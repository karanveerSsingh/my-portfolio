import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  dots = Array.from({ length: 30 }, (_, i) => i);
  typed = signal('');
  private roles = ['Frontend Developer', 'Angular Developer', 'UI Designer'];
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer?: number;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.tick();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private tick = () => {
    const current = this.roles[this.roleIndex];
    if (this.deleting) {
      this.charIndex--;
      this.typed.set(current.slice(0, this.charIndex));
      if (this.charIndex === 0) {
        this.deleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.timer = window.setTimeout(this.tick, 350);
        return;
      }
      this.timer = window.setTimeout(this.tick, 40);
    } else {
      this.charIndex++;
      this.typed.set(current.slice(0, this.charIndex));
      if (this.charIndex === current.length) {
        this.deleting = true;
        this.timer = window.setTimeout(this.tick, 1600);
        return;
      }
      this.timer = window.setTimeout(this.tick, 80);
    }
  };

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadResume() {
    // Placeholder PDF: a tiny generated file path users can replace.
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Karanveer-Singh-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
