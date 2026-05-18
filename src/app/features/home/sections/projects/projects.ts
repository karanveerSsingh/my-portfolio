import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: 'dashboard' | 'webapp' | 'crm';
  icon: string;
  colors: [string, string];
  live: string;
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="projects">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">Portfolio</span>
          <h2>Featured Projects</h2>
          <p>A selection of recent projects showcasing frontend craftsmanship.</p>
        </div>

        <div class="filters" appReveal>
          @for (f of filters; track f.id) {
            <button
              class="filter-btn"
              [class.active]="activeFilter() === f.id"
              (click)="setFilter(f.id)"
            >
              {{ f.label }}
            </button>
          }
        </div>

        <div class="projects-grid">
          @for (p of visible(); track p.title; let i = $index) {
            <article class="project-card" appReveal [revealDelay]="i * 80">
              <div
                class="thumb"
                [style.background]="
                  'linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')'
                "
              >
                <i [class]="p.icon"></i>
                <div class="overlay">
                  <a
                    [href]="p.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    title="Live Demo"
                  >
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                  <a
                    [href]="p.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div class="body">
                <h4>{{ p.title }}</h4>
                <p>{{ p.description }}</p>
                <div class="tags">
                  @for (t of p.tags; track t) {
                    <span>{{ t }}</span>
                  }
                </div>
                <div class="actions">
                  <a
                    class="btn btn-primary"
                    [href]="p.live"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-solid fa-play"></i> Live Demo
                  </a>
                  <a class="btn" [href]="p.github" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i> Code
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-bottom: 40px;
      }
      .filter-btn {
        padding: 9px 18px;
        border-radius: 999px;
        background: var(--card);
        border: 1px solid var(--card-border);
        color: var(--text-muted);
        font-size: 13px;
        font-weight: 600;
        transition: all var(--transition);
      }
      .filter-btn:hover {
        color: var(--text);
      }
      .filter-btn.active {
        background: var(--gradient);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 8px 24px rgba(124, 92, 255, 0.35);
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
        gap: 24px;
      }

      .project-card {
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius);
        overflow: hidden;
        transition:
          transform var(--transition),
          box-shadow var(--transition),
          border-color var(--transition);
        display: flex;
        flex-direction: column;
      }
      .project-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary-2);
        box-shadow: 0 30px 60px rgba(124, 92, 255, 0.25);
      }

      .thumb {
        position: relative;
        aspect-ratio: 16 / 9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 64px;
        color: rgba(255, 255, 255, 0.9);
        overflow: hidden;
      }
      .thumb::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 60%);
      }
      .overlay {
        position: absolute;
        inset: 0;
        background: rgba(11, 16, 32, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        opacity: 0;
        transition: opacity 0.35s ease;
      }
      .project-card:hover .overlay {
        opacity: 1;
      }
      .overlay a {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: var(--gradient);
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transform: translateY(20px);
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .project-card:hover .overlay a {
        transform: none;
      }
      .overlay a:nth-child(2) {
        transition-delay: 0.08s;
      }

      .body {
        padding: 22px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .body h4 {
        margin: 0 0 8px;
        font-size: 18px;
      }
      .body p {
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.7;
        margin: 0 0 14px;
        flex: 1;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 16px;
      }
      .tags span {
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--gradient-soft);
        color: var(--primary-2);
        font-weight: 600;
      }
      .actions {
        display: flex;
        gap: 10px;
      }
      .actions .btn {
        padding: 9px 14px;
        font-size: 12px;
      }
    `,
  ],
})
export class ProjectsComponent {
  filters = [
    { id: 'all', label: 'All' },
    { id: 'crm', label: 'CRM' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'webapp', label: 'Web Apps' },
  ] as const;

  activeFilter = signal<'all' | 'dashboard' | 'webapp' | 'crm'>('all');

  projects: Project[] = [
    {
      title: 'Accessories CRM — Maruti Suzuki',
      description:
        'Full CRM frontend covering enquiry, booking, and invoice workflows with real-time sales analytics. Implemented dynamic technician assignment logic and configurable UI filters, enabling dealership staff to manage day-to-day operations without manual workarounds.',
      tags: ['Angular', 'REST APIs', 'Dynamic UI Filters', 'TypeScript'],
      category: 'crm',
      icon: 'fa-solid fa-car',
      colors: ['#7c5cff', '#22d3ee'],
      live: '#',
      github: '#',
    },
    {
      title: 'True Value Dashboard — Maruti Suzuki',
      description:
        'High-performance dashboard with seamless UX across mobile, tablet, and desktop, serving multiple internal stakeholder personas. Engineered a shared component library (buttons, modals, inputs) to eliminate code duplication and accelerate feature delivery.',
      tags: ['Angular', 'Angular Material', 'RESTful APIs', 'Responsive'],
      category: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      colors: ['#ec4899', '#8b5cf6'],
      live: '#',
      github: '#',
    },
    {
      title: 'PET — Penetration Enhance Tool',
      description:
        'Enterprise analytics and performance tracking platform for Maruti Suzuki serving MSIL leadership, distributors, and sales executives. Supported requirement gathering, UAT coordination, data validation, and cross-functional stakeholder communication.',
      tags: ['Angular', 'AI/ML Integration', 'BI Reporting'],
      category: 'dashboard',
      icon: 'fa-solid fa-chart-pie',
      colors: ['#22d3ee', '#34d399'],
      live: '#',
      github: '#',
    },
    {
      title: 'Booking & Invoice Module',
      description:
        'Multi-panel responsive booking and invoicing module with role-based UI access control and live sales analytics, used daily by dealership sales and technician teams.',
      tags: ['Angular', 'RxJS', 'REST APIs'],
      category: 'webapp',
      icon: 'fa-solid fa-file-invoice',
      colors: ['#f97316', '#fbbf24'],
      live: '#',
      github: '#',
    },
    {
      title: 'MERN Web Applications',
      description:
        'Responsive web applications built with MongoDB, Express, React, and Node.js — improving user experience across mobile, tablet, and desktop platforms.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      category: 'webapp',
      icon: 'fa-brands fa-react',
      colors: ['#06b6d4', '#3b82f6'],
      live: '#',
      github: '#',
    },
    {
      title: 'React Component Library',
      description:
        'Reusable React component library (buttons, modals, inputs) adhering to ES6+ standards — reduced code redundancy and accelerated team velocity during my internship.',
      tags: ['React', 'ES6+', 'Component Design'],
      category: 'webapp',
      icon: 'fa-solid fa-shapes',
      colors: ['#8b5cf6', '#22d3ee'],
      live: '#',
      github: '#',
    },
  ];

  visible = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.projects : this.projects.filter((p) => p.category === f);
  });

  setFilter(id: 'all' | 'dashboard' | 'webapp' | 'crm') {
    this.activeFilter.set(id);
  }
}
