import { Component, Input } from '@angular/core';
import { Experience } from '../../info/experience-info';
import { SkillIcon } from '../skill-icon/skill-icon';

@Component({
  selector: 'app-carousel-item',
  imports: [SkillIcon],
  templateUrl: './carousel-item.html',
  styleUrl: './carousel-item.css',
})
export class CarouselItem {
  @Input({ required: true }) item!: Experience;
}
