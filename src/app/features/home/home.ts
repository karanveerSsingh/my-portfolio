import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { SkillsComponent } from './sections/skills/skills';
import { ProjectsComponent } from './sections/projects/projects';
import { ExperienceComponent } from './sections/experience/experience';
import { ServicesComponent } from './sections/services/services';
import { StatsComponent } from './sections/stats/stats';
import { TestimonialsComponent } from './sections/testimonials/testimonials';
import { ContactComponent } from './sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ServicesComponent,
    StatsComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero id="home"></app-hero>
    <app-about id="about"></app-about>
    <app-skills id="skills"></app-skills>
    <app-stats></app-stats>
    <app-projects id="projects"></app-projects>
    <app-experience id="experience"></app-experience>
    <app-services id="services"></app-services>
    <app-testimonials></app-testimonials>
    <app-contact id="contact"></app-contact>
  `,
})
export class HomeComponent {}
