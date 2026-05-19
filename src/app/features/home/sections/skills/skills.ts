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
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  private readonly platformId = inject(PLATFORM_ID);
  readonly animated = signal(false);

  readonly skills: Skill[] = [
    { name: 'Angular', level: 72, icon: 'fa-brands fa-angular', color: '#dd0031' },
    { name: 'Angular Material', level: 88, icon: 'fa-solid fa-cube', color: '#3f51b5' },
    { name: 'JavaScript (ES6+)', level: 70, icon: 'fa-brands fa-js', color: '#f7df1e' },
    { name: 'React', level: 78, icon: 'fa-brands fa-react', color: '#61dafb' },
    { name: 'HTML5', level: 95, icon: 'fa-brands fa-html5', color: '#e34f26' },
    { name: 'CSS3 / SCSS', level: 90, icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
    { name: 'REST APIs', level: 90, icon: 'fa-solid fa-network-wired', color: '#22d3ee' },
    { name: 'Git & GitHub', level: 80, icon: 'fa-brands fa-git-alt', color: '#f05032' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.animated.set(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(this.host.nativeElement);
  }
}
