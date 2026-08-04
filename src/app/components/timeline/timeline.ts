import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { LanguageService } from '../../info/language-info';
import { ScrollInDirective } from '../../directives/scroll-in.directive';

@Component({
  selector: 'app-timeline',
  imports: [NgOptimizedImage, ScrollInDirective],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {
  private readonly languageService = inject(LanguageService);
  protected readonly sections = computed(() => this.languageService.timelineSections());
}
