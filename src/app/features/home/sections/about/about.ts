import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="about">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">About Me</span>
          <h2>Crafting interfaces with purpose</h2>
          <p>Get to know the engineer behind the code.</p>
        </div>

        <div class="about-grid">
          <div class="about-visual" appReveal>
            <div class="photo-wrap">
              <div class="photo"><i class="fa-solid fa-user-astronaut"></i></div>
              <div class="exp-badge">
                <strong>2+</strong>
                <span>Years of<br />Experience</span>
              </div>
            </div>
          </div>

          <div class="about-content" appReveal [revealDelay]="120">
            <h3>Frontend Developer based in Jaipur, India</h3>
            <p>
              I'm <strong>Karanveer Singh</strong>, a results-driven Frontend Developer with over
              <strong>1.5 years</strong> of hands-on experience delivering scalable,
              production-ready web applications using <strong>Angular</strong>. I've built CRM
              platforms and data-intensive dashboards for <strong>Maruti Suzuki</strong>, now
              actively used across dealerships.
            </p>
            <p>
              I specialize in RESTful API integration, responsive UI design, and reusable component
              architecture. I'm adept at collaborating with cross-functional teams to translate
              complex requirements into performant, user-centric features on time.
            </p>

            <div class="about-meta">
              <div>
                <i class="fa-solid fa-location-dot"></i><span><b>Location</b> Jaipur, India</span>
              </div>
              <div>
                <i class="fa-solid fa-envelope"></i
                ><span><b>Email</b> karanveer0508singh&#64;gmail.com</span>
              </div>
              <div>
                <i class="fa-solid fa-phone"></i><span><b>Phone</b> +91-8005942278</span>
              </div>
              <div>
                <i class="fa-solid fa-graduation-cap"></i
                ><span><b>Education</b> B.A., SS Jain Subodh PG College</span>
              </div>
            </div>

            <div class="tech-pills">
              <span>Angular</span><span>Angular Material</span><span>TypeScript</span
              ><span>JavaScript (ES6+)</span><span>React</span><span>RxJS</span><span>HTML5</span
              ><span>CSS3</span><span>REST APIs</span><span>Git</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about-grid {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 60px;
        align-items: center;
      }
      .photo-wrap {
        position: relative;
        max-width: 360px;
        margin: 0 auto;
      }
      .photo {
        aspect-ratio: 1;
        border-radius: 30px;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 140px;
        color: #fff;
        box-shadow: var(--shadow);
        position: relative;
        overflow: hidden;
      }
      .photo::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
      }
      .exp-badge {
        position: absolute;
        bottom: -18px;
        right: -18px;
        background: var(--bg-elev);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: var(--shadow);
        animation: floatY 4s ease-in-out infinite;
      }
      .exp-badge strong {
        font-size: 36px;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .exp-badge span {
        font-size: 12px;
        color: var(--text-muted);
        line-height: 1.3;
      }
      @keyframes floatY {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      h3 {
        font-size: 24px;
        margin: 0 0 14px;
      }
      p {
        color: var(--text-muted);
        line-height: 1.8;
        margin: 0 0 14px;
      }
      .about-content strong {
        color: var(--text);
      }

      .about-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin: 24px 0;

        div {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-muted);
        }
        i {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gradient-soft);
          color: var(--primary-2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        b {
          display: block;
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
        }
      }

      .tech-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        span {
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--card);
          border: 1px solid var(--card-border);
          font-size: 12px;
          font-weight: 500;
          transition: all var(--transition);
        }
        span:hover {
          background: var(--gradient);
          color: #fff;
          border-color: transparent;
          transform: translateY(-2px);
        }
      }

      @media (max-width: 900px) {
        .about-grid {
          grid-template-columns: 1fr;
          gap: 80px;
        }
        .about-meta {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AboutComponent {}
