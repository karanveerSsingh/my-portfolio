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
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  readonly items: ExperienceItem[] = [
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
