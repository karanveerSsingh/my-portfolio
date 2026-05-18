import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  icon: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="experience">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">Experience</span>
          <h2>My Professional Journey</h2>
          <p>
            1.5+ years of frontend development, building production CRMs and dashboards for Maruti
            Suzuki.
          </p>
        </div>

        <div class="timeline">
          @for (item of items; track item.company; let i = $index) {
            <div class="t-item" [class.right]="i % 2 === 1" appReveal [revealDelay]="i * 100">
              <div class="t-dot"><i [class]="item.icon"></i></div>
              <div class="t-card card">
                <span class="period"><i class="fa-regular fa-calendar"></i> {{ item.period }}</span>
                <h4>{{ item.role }}</h4>
                <p class="company"><i class="fa-solid fa-building"></i> {{ item.company }}</p>
                <ul>
                  @for (r of item.responsibilities; track r) {
                    <li><i class="fa-solid fa-check"></i> {{ r }}</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .timeline {
        position: relative;
        padding: 20px 0;
      }
      .timeline::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 2px;
        background: linear-gradient(
          180deg,
          transparent,
          var(--primary) 20%,
          var(--primary-2) 80%,
          transparent
        );
        transform: translateX(-50%);
      }
      .t-item {
        position: relative;
        width: 50%;
        padding: 20px 50px 20px 0;
        box-sizing: border-box;
      }
      .t-item.right {
        margin-left: 50%;
        padding: 20px 0 20px 50px;
      }
      .t-dot {
        position: absolute;
        top: 36px;
        right: -22px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--gradient);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow:
          0 0 0 6px var(--bg),
          0 10px 30px rgba(124, 92, 255, 0.35);
        z-index: 2;
      }
      .t-item.right .t-dot {
        left: -22px;
        right: auto;
      }

      .t-card {
        padding: 22px;
      }
      .period {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 999px;
        background: var(--gradient-soft);
        color: var(--primary-2);
        margin-bottom: 10px;
      }
      h4 {
        margin: 0 0 6px;
        font-size: 18px;
      }
      .company {
        color: var(--text-muted);
        font-size: 14px;
        margin: 0 0 12px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      li {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        font-size: 14px;
        color: var(--text-muted);
        line-height: 1.5;
      }
      li i {
        color: var(--success);
        margin-top: 4px;
      }

      @media (max-width: 800px) {
        .timeline::before {
          left: 22px;
        }
        .t-item,
        .t-item.right {
          width: 100%;
          margin-left: 0;
          padding: 20px 0 20px 60px;
        }
        .t-dot,
        .t-item.right .t-dot {
          left: 0;
          right: auto;
          top: 26px;
        }
      }
    `,
  ],
})
export class ExperienceComponent {
  items: ExperienceItem[] = [
    {
      role: 'Frontend Developer',
      company: 'Autovyn Consultancy Pvt. Ltd.',
      period: 'Dec 2024 — Present',
      icon: 'fa-solid fa-rocket',
      responsibilities: [
        'Architected and shipped the Maruti Suzuki CRM frontend from scratch — covering accessory sales, customer management, enquiry, booking, and invoice modules — now actively used across dealerships.',
        'Built reusable Angular components integrated with RESTful APIs, reducing feature development time by standardizing UI patterns across the application.',
        'Implemented role-based UI access control, dynamic filter logic, and multi-panel responsive layouts, improving operational efficiency for sales and technician teams.',
        'Diagnosed and resolved critical real-time client UI issues affecting large datasets, improving application reliability and user experience.',
        'Collaborated with backend and QA teams in Agile sprints to deliver invoicing with live sales analytics and booking dashboards with real-time BI reports.',
      ],
    },
    {
      role: 'Frontend Intern',
      company: 'Gass Solution Pvt. Ltd.',
      period: 'Oct 2023 — Nov 2024',
      icon: 'fa-solid fa-code',
      responsibilities: [
        'Developed responsive web applications with the MERN stack (MongoDB, Express, React, Node.js), improving user experience across mobile, tablet, and desktop platforms.',
        'Built a reusable React component library (buttons, modals, inputs) adhering to ES6+ standards, reducing code redundancy and accelerating team velocity.',
        'Integrated REST APIs with Node.js to ensure seamless frontend-backend data flow and improved application performance.',
      ],
    },
    {
      role: 'Bachelor of Arts',
      company: 'SS Jain Subodh PG College',
      period: 'Graduated July 2018',
      icon: 'fa-solid fa-graduation-cap',
      responsibilities: [
        'Completed Bachelor of Arts degree.',
        'Self-taught web development and transitioned into the tech industry.',
      ],
    },
  ];
}
