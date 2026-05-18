import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // ensure ThemeService is initialized on bootstrap
  private theme = inject(ThemeService);
}
