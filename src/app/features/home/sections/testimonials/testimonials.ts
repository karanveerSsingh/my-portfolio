import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  icon: string;
}

interface VisitorComment {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  createdAt: number;
}

const STORAGE_KEY = 'kv_visitor_comments_v1';
const AUTOPLAY_MS = 6000;
const SUCCESS_MS = 4000;

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);

  readonly starList: readonly number[] = [1, 2, 3, 4, 5];

  readonly active = signal(0);
  readonly rating = signal(0);
  readonly submitted = signal(false);
  readonly visitorComments = signal<VisitorComment[]>([]);

  private autoplayId?: number;
  private successId?: number;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    role: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly testimonials: Testimonial[] = [
    {
      name: 'Project Lead',
      role: 'Autovyn Consultancy Pvt. Ltd.',
      quote:
        'Karanveer architected our Maruti Suzuki CRM frontend from scratch. His Angular components are clean, reusable, and the dashboards now run flawlessly across dealerships.',
      icon: 'fa-solid fa-user-tie',
    },
    {
      name: 'Backend Teammate',
      role: 'API & Integration Team',
      quote:
        'Smooth REST integrations, careful error handling, and quick turnaround on UI issues. He genuinely cares about how the product feels end-to-end.',
      icon: 'fa-solid fa-user-gear',
    },
    {
      name: 'QA Engineer',
      role: 'Agile Sprint Team',
      quote:
        'Bugs that came up on huge datasets were diagnosed and fixed quickly. Karanveer\u2019s code is reliable and his UI handles edge cases really well.',
      icon: 'fa-solid fa-user-check',
    },
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadComments();
    this.autoplayId = window.setInterval(() => this.next(), AUTOPLAY_MS);
  }

  ngOnDestroy(): void {
    if (this.autoplayId) clearInterval(this.autoplayId);
    if (this.successId) clearTimeout(this.successId);
  }

  next(): void {
    this.active.update((v) => (v + 1) % this.testimonials.length);
  }

  prev(): void {
    this.active.update(
      (v) => (v - 1 + this.testimonials.length) % this.testimonials.length,
    );
  }

  showErr(field: 'name' | 'message'): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, role, message } = this.form.value;
    const comment: VisitorComment = {
      id: this.uid(),
      name: (name || '').trim(),
      role: (role || '').trim(),
      message: (message || '').trim(),
      rating: this.rating(),
      createdAt: Date.now(),
    };
    this.visitorComments.update((list) => [comment, ...list]);
    this.saveComments();
    this.form.reset({ name: '', role: '', message: '' });
    this.rating.set(0);
    this.submitted.set(true);
    if (this.successId) clearTimeout(this.successId);
    this.successId = window.setTimeout(
      () => this.submitted.set(false),
      SUCCESS_MS,
    );
  }

  remove(id: string): void {
    this.visitorComments.update((list) => list.filter((c) => c.id !== id));
    this.saveComments();
  }

  initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('');
  }

  formatDate(ts: number): string {
    return new Date(ts).toLocaleString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private uid(): string {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  private loadComments(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as VisitorComment[];
      if (Array.isArray(parsed)) this.visitorComments.set(parsed);
    } catch {
      /* ignore */
    }
  }

  private saveComments(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.visitorComments()));
    } catch {
      /* ignore */
    }
  }
}
