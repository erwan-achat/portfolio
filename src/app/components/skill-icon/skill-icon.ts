import { Component, inject, Input } from '@angular/core';

import { LanguageService } from '../../info/language-info';
import { SkillLevel } from '../../info/experience-info';

@Component({
  selector: 'app-skill-icon',
  templateUrl: './skill-icon.html',
  styleUrl: './skill-icon.css',
})
export class SkillIcon {
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() level: SkillLevel = 'intermediate';

  protected readonly languageService = inject(LanguageService);

  protected get translatedLevel(): string {
    return this.languageService.ui().skillLevels[this.level];
  }
}
