import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="services">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">Services</span>
          <h2>What I Offer</h2>
          <p>End-to-end frontend services tailored for product teams and startups.</p>
        </div>

        <div class="services-grid">
          @for (s of services; track s.title; let i = $index) {
            <div class="service-card" appReveal [revealDelay]="i * 80">
              <div class="icon"><i [class]="s.icon"></i></div>
              <h4>{{ s.title }}</h4>
              <p>{{ s.description }}</p>
              <ul>
                @for (f of s.features; track f) {
                  <li><i class="fa-solid fa-check"></i> {{ f }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 22px;
      }
      .service-card {
        position: relative;
        padding: 28px;
        border-radius: var(--radius);
        background: var(--card);
        border: 1px solid var(--card-border);
        overflow: hidden;
        transition:
          transform var(--transition),
          border-color var(--transition);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
      .service-card::before {
        content: '';
        position: absolute;
        top: -60px;
        right: -60px;
        width: 180px;
        height: 180px;
        background: var(--gradient);
        opacity: 0.08;
        border-radius: 50%;
        transition: transform 0.6s ease;
      }
      .service-card:hover {
        transform: translateY(-8px);
        border-color: var(--primary-2);
      }
      .service-card:hover::before {
        transform: scale(2.2);
        opacity: 0.14;
      }

      .icon {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        background: var(--gradient);
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 18px;
        box-shadow: 0 12px 30px rgba(124, 92, 255, 0.35);
      }
      h4 {
        margin: 0 0 10px;
        font-size: 18px;
      }
      p {
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.7;
        margin: 0 0 14px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      li {
        font-size: 13px;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      li i {
        color: var(--success);
        font-size: 11px;
      }
    `,
  ],
})
export class ServicesComponent {
  services = [
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
