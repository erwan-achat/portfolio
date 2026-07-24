import { Component, Input } from '@angular/core';

export type SkillLevel = 'Intermédiaire' | 'Maîtrise' | 'Avancé';

@Component({
  selector: 'app-skill-icon',
  templateUrl: './skill-icon.html',
  styleUrl: './skill-icon.css',
})
export class SkillIcon {
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() level: SkillLevel = 'Intermédiaire';
}
