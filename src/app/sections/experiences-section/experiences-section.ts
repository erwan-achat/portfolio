import { Component, inject } from '@angular/core';
import { LanguageService } from '../../info/language-info';
import { Carousel } from '../../components/carousel/carousel';

@Component({
  selector: 'app-experiences-section',
  imports: [Carousel],
  templateUrl: './experiences-section.html',
  styleUrl: './experiences-section.css',
})
export class ExperiencesSection {
  protected readonly languageService = inject(LanguageService);
  protected readonly experiences = this.languageService.experiences;
}
