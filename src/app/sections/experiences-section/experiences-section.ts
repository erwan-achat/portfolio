import { Component, inject } from '@angular/core';
import { EXPERIENCES, Experience } from '../../info/experience-info';
import { Carousel } from '../../components/carousel/carousel';

@Component({
  selector: 'app-experiences-section',
  imports: [Carousel],
  templateUrl: './experiences-section.html',
  styleUrl: './experiences-section.css',
})
export class ExperiencesSection {
  protected readonly experiences: Experience[] = inject(EXPERIENCES);
}
