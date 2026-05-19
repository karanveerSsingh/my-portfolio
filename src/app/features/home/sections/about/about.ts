import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  readonly techPills: readonly string[] = [
    'Angular',
    'Angular Material',
    'TypeScript',
    'JavaScript (ES6+)',
    'React',
    // 'RxJS',
    'HTML5',
    'CSS3',
    'REST APIs',
    'Git',
  ];
}
