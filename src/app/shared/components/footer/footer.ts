import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="brand">
          <span class="logo-dot"></span>
          <span>Karanveer<strong>.dev</strong></span>
        </div>
        <p>© {{ year }} Karanveer Singh. Crafted with Angular & ❤️.</p>
        <div class="socials">
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
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            title="Twitter"
            ><i class="fa-brands fa-x-twitter"></i
          ></a>
          <a href="mailto:karanveer0508singh@gmail.com" aria-label="Email" title="Email"
            ><i class="fa-solid fa-envelope"></i
          ></a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 40px 0 30px;
        border-top: 1px solid var(--card-border);
        background: var(--bg-elev);
        margin-top: 40px;
      }
      .footer-inner {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        align-items: center;
        justify-content: space-between;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 18px;
      }
      .brand strong {
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .logo-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--gradient);
      }
      p {
        color: var(--text-muted);
        font-size: 14px;
        margin: 0;
      }
      .socials {
        display: flex;
        gap: 10px;
      }
      .socials a {
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--card);
        border: 1px solid var(--card-border);
        color: var(--text);
        transition: all var(--transition);
      }
      .socials a:hover {
        background: var(--gradient);
        color: #fff;
        transform: translateY(-3px);
      }
    `,
  ],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
