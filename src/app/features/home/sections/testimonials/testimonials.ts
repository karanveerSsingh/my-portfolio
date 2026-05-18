import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  icon: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="testimonials">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">Testimonials</span>
          <h2>What People Say</h2>
          <p>Feedback from clients and colleagues I've worked with.</p>
        </div>

        <div class="t-stage" appReveal>
          @for (t of testimonials; track t.name; let i = $index) {
            <div class="t-card" [class.active]="i === active()">
              <i class="fa-solid fa-quote-left quote"></i>
              <p>"{{ t.quote }}"</p>
              <div class="author">
                <div class="avatar"><i [class]="t.icon"></i></div>
                <div>
                  <h4>{{ t.name }}</h4>
                  <small>{{ t.role }}</small>
                </div>
              </div>
            </div>
          }

          <div class="controls">
            <button (click)="prev()" aria-label="Previous">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="dots">
              @for (t of testimonials; track t.name; let i = $index) {
                <span [class.active]="i === active()" (click)="active.set(i)"></span>
              }
            </div>
            <button (click)="next()" aria-label="Next">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .t-stage {
        position: relative;
        max-width: 760px;
        margin: 0 auto;
      }
      .t-card {
        position: absolute;
        inset: 0;
        padding: 36px;
        text-align: center;
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        opacity: 0;
        transform: translateY(20px) scale(0.97);
        transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
      .t-card.active {
        position: relative;
        opacity: 1;
        transform: none;
        pointer-events: auto;
      }
      .quote {
        font-size: 32px;
        color: var(--primary);
        opacity: 0.6;
        margin-bottom: 14px;
      }
      .t-card p {
        font-size: 17px;
        line-height: 1.8;
        color: var(--text);
        margin: 0 0 22px;
        font-style: italic;
      }
      .author {
        display: inline-flex;
        align-items: center;
        gap: 14px;
      }
      .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--gradient);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
      }
      .author h4 {
        margin: 0;
        font-size: 15px;
      }
      .author small {
        color: var(--text-muted);
        font-size: 12px;
      }

      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 26px;
      }
      .controls button {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: var(--card);
        border: 1px solid var(--card-border);
        color: var(--text);
        transition: all var(--transition);
      }
      .controls button:hover {
        background: var(--gradient);
        color: #fff;
        border-color: transparent;
      }
      .dots {
        display: flex;
        gap: 8px;
      }
      .dots span {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--card-border);
        cursor: pointer;
        transition: all var(--transition);
      }
      .dots span.active {
        background: var(--gradient);
        width: 26px;
        border-radius: 99px;
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  active = signal(0);
  private timer?: number;

  testimonials: Testimonial[] = [
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
    this.timer = window.setInterval(() => this.next(), 6000);
  }
  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next() {
    this.active.update((v) => (v + 1) % this.testimonials.length);
  }
  prev() {
    this.active.update((v) => (v - 1 + this.testimonials.length) % this.testimonials.length);
  }
}
