import { Component, Input, inject } from '@angular/core';
import { Experience } from '../../info/experience-info';
import { SkillIcon } from '../skill-icon/skill-icon';
import { ASSET_BASE } from '../../info/base-url';

@Component({
  selector: 'app-carousel-item',
  imports: [SkillIcon],
  templateUrl: './carousel-item.html',
  styleUrl: './carousel-item.css',
})
export class CarouselItem {
  @Input({ required: true }) item!: Experience;
  private assetBase = inject(ASSET_BASE);

  protected linkUrl(url: string): string {
    const path = url.startsWith('/') ? url.slice(1) : url;
    return this.assetBase + path;
  }
}
