import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type ProjectCategory = 'all' | 'dashboard' | 'webapp' | 'crm';

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: Exclude<ProjectCategory, 'all'>;
  icon: string;
  colors: [string, string];
  live: string;
  github: string;
}

interface Filter {
  id: ProjectCategory;
  label: string;
}

type CardPosition = 'active' | 'prev' | 'next' | 'hidden';

const AUTOPLAY_MS = 10000;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly filters: readonly Filter[] = [
    { id: 'all', label: 'All' },
    { id: 'crm', label: 'CRM' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'webapp', label: 'Web Apps' },
  ];

  readonly activeFilter = signal<ProjectCategory>('all');
  readonly carouselIndex = signal(0);

  private autoplayId?: number;

  readonly projects: Project[] = [
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

  readonly visible = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.projects : this.projects.filter((p) => p.category === f);
  });

  constructor() {
    // Reset carousel position whenever the visible set changes (filter switch).
    effect(() => {
      this.visible();
      this.carouselIndex.set(0);
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.autoplayId = window.setInterval(() => this.nextSlide(), AUTOPLAY_MS);
  }

  ngOnDestroy(): void {
    if (this.autoplayId) clearInterval(this.autoplayId);
  }

  setFilter(id: ProjectCategory): void {
    this.activeFilter.set(id);
  }

  nextSlide(): void {
    const n = this.visible().length;
    if (n === 0) return;
    this.carouselIndex.update((v) => (v + 1) % n);
  }

  prevSlide(): void {
    const n = this.visible().length;
    if (n === 0) return;
    this.carouselIndex.update((v) => (v - 1 + n) % n);
  }

  goToSlide(i: number): void {
    this.carouselIndex.set(i);
  }

  /** Returns the layout position of a slide relative to the active index. */
  slidePosition(i: number): CardPosition {
    const a = this.carouselIndex();
    const n = this.visible().length;
    if (n === 0) return 'hidden';
    const diff = (i - a + n) % n;
    if (diff === 0) return 'active';
    if (diff === 1) return 'next';
    if (diff === n - 1) return 'prev';
    return 'hidden';
  }
}
