import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../info/language-info';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly languageService = inject(LanguageService);
  protected readonly navSections = this.languageService.navSections;
  protected readonly personalInfo = this.languageService.personalInfo;
  
}
