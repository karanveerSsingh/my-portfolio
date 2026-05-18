import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  template: `
    <section class="contact">
      <div class="container">
        <div class="section-title" appReveal>
          <span class="eyebrow">Get In Touch</span>
          <h2>Let's Build Something Together</h2>
          <p>Have a project in mind? Drop a message — I usually reply within 24h.</p>
        </div>

        <div class="contact-grid">
          <div class="info" appReveal>
            <h3>Contact Information</h3>
            <p class="muted">Feel free to reach out via any channel below.</p>

            <div class="info-list">
              <a href="mailto:karanveer0508singh@gmail.com" class="info-item">
                <i class="fa-solid fa-envelope"></i>
                <div><b>Email</b><span>karanveer0508singh@gmail.com</span></div>
              </a>
              <a
                href="https://www.linkedin.com/in/karanveer-singh-6a0332308/"
                target="_blank"
                rel="noopener noreferrer"
                class="info-item"
              >
                <i class="fa-brands fa-linkedin-in"></i>
                <div><b>LinkedIn</b><span>linkedin.com/in/karanveer-singh</span></div>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="info-item"
              >
                <i class="fa-brands fa-github"></i>
                <div><b>GitHub</b><span>github.com/karanveersingh</span></div>
              </a>
              <a href="tel:+918005942278" class="info-item">
                <i class="fa-solid fa-phone"></i>
                <div><b>Phone</b><span>+91-8005942278</span></div>
              </a>
              <div class="info-item static">
                <i class="fa-solid fa-location-dot"></i>
                <div><b>Location</b><span>Jaipur, India</span></div>
              </div>
            </div>

            <div class="socials-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                ><i class="fa-brands fa-github"></i
              ></a>
              <a
                href="https://www.linkedin.com/in/karanveer-singh-6a0332308/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                ><i class="fa-brands fa-linkedin-in"></i
              ></a>
              <a href="mailto:karanveer0508singh@gmail.com" aria-label="Email" title="Email"
                ><i class="fa-solid fa-envelope"></i
              ></a>
              <a href="tel:+918005942278" aria-label="Phone" title="Phone"
                ><i class="fa-solid fa-phone"></i
              ></a>
            </div>
          </div>

          <form
            class="form card"
            [formGroup]="form"
            (ngSubmit)="submit()"
            appReveal
            [revealDelay]="120"
          >
            <div class="row">
              <label>
                <span>Your Name</span>
                <input type="text" formControlName="name" placeholder="John Doe" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" formControlName="email" placeholder="you@email.com" />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input type="text" formControlName="subject" placeholder="Project inquiry" />
            </label>
            <label>
              <span>Message</span>
              <textarea
                formControlName="message"
                rows="5"
                placeholder="Tell me about your project..."
              ></textarea>
            </label>
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || sending()">
              @if (sending()) {
                <i class="fa-solid fa-circle-notch fa-spin"></i> Sending...
              } @else {
                <i class="fa-solid fa-paper-plane"></i> Send Message
              }
            </button>
            @if (sent()) {
              <div class="success">
                <i class="fa-solid fa-circle-check"></i> Message sent! I'll get back to you shortly.
              </div>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact-grid {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 30px;
        align-items: start;
      }
      .info h3 {
        margin: 0 0 6px;
        font-size: 22px;
      }
      .muted {
        color: var(--text-muted);
        margin: 0 0 24px;
      }

      .info-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }
      .info-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 14px;
        background: var(--card);
        border: 1px solid var(--card-border);
        transition: all var(--transition);
        cursor: pointer;
      }
      .info-item.static {
        cursor: default;
      }
      .info-item:not(.static):hover {
        transform: translateX(6px);
        border-color: var(--primary-2);
      }
      .info-item i {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: var(--gradient);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      .info-item b {
        display: block;
        font-size: 13px;
      }
      .info-item span {
        color: var(--text-muted);
        font-size: 13px;
      }

      .socials-row {
        display: flex;
        gap: 10px;
      }
      .socials-row a {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--card);
        border: 1px solid var(--card-border);
        color: var(--text);
        transition: all var(--transition);
      }
      .socials-row a:hover {
        background: var(--gradient);
        color: #fff;
        transform: translateY(-3px);
        border-color: transparent;
      }

      .form {
        padding: 28px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 13px;
        color: var(--text-muted);
      }
      input,
      textarea {
        width: 100%;
        padding: 12px 14px;
        border-radius: 12px;
        background: var(--bg-soft);
        border: 1px solid var(--card-border);
        color: var(--text);
        font-family: inherit;
        font-size: 14px;
        transition:
          border-color var(--transition),
          box-shadow var(--transition);
        resize: vertical;
      }
      input:focus,
      textarea:focus {
        outline: none;
        border-color: var(--primary-2);
        box-shadow: 0 0 0 3px var(--gradient-soft);
      }
      button[type='submit'] {
        align-self: flex-start;
      }
      button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .success {
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(52, 211, 153, 0.12);
        border: 1px solid rgba(52, 211, 153, 0.35);
        color: var(--success);
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      @media (max-width: 900px) {
        .contact-grid {
          grid-template-columns: 1fr;
        }
        .row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  sending = signal(false);
  sent = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.sent.set(true);
      this.form.reset();
      setTimeout(() => this.sent.set(false), 5000);
    }, 1400);
  }
}
