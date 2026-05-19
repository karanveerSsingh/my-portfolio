import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Stat {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class StatsComponent implements AfterViewInit {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  private readonly platformId = inject(PLATFORM_ID);

  readonly stats: Stat[] = [
    { value: 1, label: 'Years of Experience', icon: 'fa-solid fa-briefcase', suffix: '+' },
    { value: 6, label: 'Major Projects Shipped', icon: 'fa-solid fa-rocket', suffix: '+' },
    { value: 3, label: 'Maruti Suzuki Products', icon: 'fa-solid fa-car', suffix: '' },
  ];

  readonly counts = signal<number[]>(this.stats.map(() => 0));

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.animateCounts();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(this.host.nativeElement);
  }

  private animateCounts(): void {
    const duration = 1600;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      this.counts.set(this.stats.map((s) => Math.round(s.value * ease(p))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
