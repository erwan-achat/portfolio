import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelector } from './language-selector';
import { LanguageService } from '../../info/language-info';

describe('LanguageSelector', () => {
  let component: LanguageSelector;
  let fixture: ComponentFixture<LanguageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changes the active language from the menu', () => {
    const service = TestBed.inject(LanguageService);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const englishButton = fixture.nativeElement.querySelectorAll('li button')[1] as HTMLButtonElement;
    englishButton.click();

    expect(service.language()).toBe('en');
    expect(localStorage.getItem('portfolio-language')).toBe('en');
  });
});
