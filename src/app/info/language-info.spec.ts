import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language-info';

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('uses the saved language before the browser language', () => {
    localStorage.setItem('portfolio-language', 'en');

    const service = TestBed.inject(LanguageService);

    expect(service.language()).toBe('en');
    expect(service.ui().send).toBe('Send message');
  });

  it('persists language changes and updates the document language', () => {
    const service = TestBed.inject(LanguageService);

    service.setLanguage('en');

    expect(localStorage.getItem('portfolio-language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(service.navSections()[0].label).toBe('About');
    expect(service.timelineSections()).toHaveLength(4);
    expect(service.experiences()[3].link?.label).toBe('Reference letter');
  });
});
