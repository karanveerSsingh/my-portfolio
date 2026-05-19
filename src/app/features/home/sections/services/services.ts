import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  readonly services: Service[] = [
    {
      title: 'Web App Development',
      description: 'Robust, scalable single-page applications built with Angular & React.',
      icon: 'fa-solid fa-laptop-code',
      features: ['Angular & React SPAs', 'State management', 'Routing & guards'],
    },
    {
      title: 'Responsive UI Design',
      description: 'Pixel-perfect, mobile-first interfaces that look great on every device.',
      icon: 'fa-solid fa-mobile-screen',
      features: ['Mobile-first', 'Cross-browser', 'Accessibility (a11y)'],
    },
    {
      title: 'API Integration',
      description: 'Seamlessly connect to REST APIs with caching, retries and error handling.',
      icon: 'fa-solid fa-plug',
      features: ['REST & GraphQL', 'JWT auth', 'Error handling'],
    },
    {
      title: 'Dashboard Development',
      description: 'Data-rich admin dashboards with charts, filters and real-time updates.',
      icon: 'fa-solid fa-chart-column',
      features: ['Interactive charts', 'Filters & search', 'Role-based access'],
    },
    {
      title: 'Performance Optimization',
      description: 'Lighthouse 90+ apps via lazy loading, code splitting and image work.',
      icon: 'fa-solid fa-gauge-high',
      features: ['Lazy loading', 'Bundle analysis', 'Core Web Vitals'],
    },
    {
      title: 'Component Libraries',
      description: 'Reusable design systems that scale across teams and products.',
      icon: 'fa-solid fa-shapes',
      features: ['Reusable UI kits', 'Storybook docs', 'Theming system'],
    },
  ];
}
