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
  template: `
    <section class="stats" #host>
      <div class="container">
        <div class="stats-grid">
          @for (s of stats; track s.label; let i = $index) {
            <div class="stat-card">
              <div class="icon"><i [class]="s.icon"></i></div>
              <div class="value">{{ counts()[i] }}{{ s.suffix || '' }}</div>
              <div class="label">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .stats {
        padding: 30px 0 50px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 18px;
        padding: 30px;
        border-radius: var(--radius);
        background: var(--card);
        border: 1px solid var(--card-border);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        box-shadow: var(--shadow);
      }
      .stat-card {
        text-align: center;
        padding: 14px;
        border-right: 1px solid var(--card-border);
      }
      .stat-card:last-child {
        border-right: none;
      }
      .icon {
        width: 50px;
        height: 50px;
        margin: 0 auto 10px;
        border-radius: 14px;
        background: var(--gradient-soft);
        color: var(--primary-2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
      }
      .value {
        font-size: 34px;
        font-weight: 800;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1;
      }
      .label {
        color: var(--text-muted);
        font-size: 13px;
        margin-top: 6px;
      }
      @media (max-width: 700px) {
        .stat-card {
          border-right: none;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 18px;
        }
        .stat-card:last-child {
          border-bottom: none;
        }
      }
    `,
  ],
})
export class StatsComponent implements AfterViewInit {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);

  stats: Stat[] = [
    { value: 2, label: 'Years of Experience', icon: 'fa-solid fa-briefcase', suffix: '+' },
    { value: 6, label: 'Major Projects Shipped', icon: 'fa-solid fa-rocket', suffix: '+' },
    { value: 3, label: 'Maruti Suzuki Products', icon: 'fa-solid fa-car', suffix: '' },
    { value: 10, label: 'Technologies Mastered', icon: 'fa-solid fa-code', suffix: '+' },
  ];

  counts = signal<number[]>(this.stats.map(() => 0));

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this.animateCounts();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(this.host.nativeElement);
  }

  private animateCounts() {
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
