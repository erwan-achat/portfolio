import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FaviconService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  initFaviconListener(): void {
    if (!window.matchMedia) return;

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateFavicon = (isDark: boolean) => {
      const favicon = this.document.getElementById('app-favicon') as HTMLLinkElement;
      if (favicon) {
        favicon.href = isDark ? 'assets/icons/favicon-dark.svg' : 'assets/icons/favicon-light.svg';
      }
    };

    updateFavicon(darkModeQuery.matches);

    darkModeQuery.addEventListener('change', (e) => updateFavicon(e.matches));
  }
}