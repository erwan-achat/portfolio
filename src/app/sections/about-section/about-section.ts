import { Component, inject } from '@angular/core';
import { PersonalCard } from '../../components/personal-card/personal-card';
import { Timeline } from '../../components/timeline/timeline';
import { LanguageService } from '../../info/language-info';
import { IconSet } from "../../components/icon-set/icon-set";

@Component({
  selector: 'app-about-section',
  imports: [PersonalCard, Timeline, IconSet],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {
  protected readonly languageService = inject(LanguageService);
  protected readonly personalInfo = this.languageService.personalInfo;
}
