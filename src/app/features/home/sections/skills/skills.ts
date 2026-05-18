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
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="skills" #host>
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">My Skills</span>
          <h2>Technologies I work with</h2>
          <p>A mix of frameworks, languages, and tools I use daily to build modern web apps.</p>
        </div>

        <div class="skills-grid">
          @for (skill of skills; track skill.name; let i = $index) {
            <div class="skill-card" appReveal [revealDelay]="i * 60">
              <div class="skill-head">
                <span class="icon" [style.color]="skill.color">
                  <i [class]="skill.icon"></i>
                </span>
                <div>
                  <h4>{{ skill.name }}</h4>
                  <small>{{ skill.level }}%</small>
                </div>
              </div>
              <div class="bar">
                <span
                  [style.width.%]="animated() ? skill.level : 0"
                  [style.background]="
                    'linear-gradient(90deg,' + skill.color + ', var(--primary-2))'
                  "
                ></span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }
      .skill-card {
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius);
        padding: 22px;
        transition:
          transform var(--transition),
          border-color var(--transition);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
      .skill-card:hover {
        transform: translateY(-6px);
        border-color: var(--primary-2);
      }
      .skill-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 14px;
      }
      .icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: var(--gradient-soft);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      h4 {
        margin: 0;
        font-size: 16px;
      }
      small {
        color: var(--text-muted);
        font-size: 12px;
      }
      .bar {
        width: 100%;
        height: 8px;
        border-radius: 999px;
        background: var(--bg-soft);
        overflow: hidden;
      }
      .bar span {
        display: block;
        height: 100%;
        width: 0;
        border-radius: 999px;
        transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1);
      }
    `,
  ],
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  animated = signal(false);

  skills: Skill[] = [
    { name: 'Angular', level: 92, icon: 'fa-brands fa-angular', color: '#dd0031' },
    { name: 'Angular Material', level: 88, icon: 'fa-solid fa-cube', color: '#3f51b5' },
    { name: 'TypeScript', level: 88, icon: 'fa-solid fa-code', color: '#3178c6' },
    { name: 'JavaScript (ES6+)', level: 90, icon: 'fa-brands fa-js', color: '#f7df1e' },
    { name: 'React', level: 78, icon: 'fa-brands fa-react', color: '#61dafb' },
    { name: 'HTML5', level: 95, icon: 'fa-brands fa-html5', color: '#e34f26' },
    { name: 'CSS3 / SCSS', level: 90, icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
    { name: 'RxJS', level: 80, icon: 'fa-solid fa-bolt', color: '#b7178c' },
    { name: 'REST APIs', level: 90, icon: 'fa-solid fa-network-wired', color: '#22d3ee' },
    { name: 'Git & GitHub', level: 85, icon: 'fa-brands fa-git-alt', color: '#f05032' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this.animated.set(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(this.host.nativeElement);
  }
}
