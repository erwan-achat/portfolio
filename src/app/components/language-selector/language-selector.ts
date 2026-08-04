import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { LanguageCode, LanguageService } from '../../info/language-info';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
})
export class LanguageSelector {
  protected readonly languageService = inject(LanguageService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected isOpen = false;

  protected toggle(): void {
    this.isOpen = !this.isOpen;
  }

  protected selectLanguage(language: LanguageCode): void {
    this.languageService.setLanguage(language);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  protected closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.isOpen = false;
  }

  @HostListener('document:keydown.escape')
  protected closeOnEscape(): void {
    this.isOpen = false;
  }
}
