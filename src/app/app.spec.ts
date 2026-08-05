import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { App } from './app';
import { routes } from './app.routes';
import { Medusae } from './components/medusae/medusae';

describe('App', () => {
  beforeEach(async () => {
    TestBed.overrideComponent(Medusae, { set: { template: '' } });
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio navigation and default section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.textContent).toContain('About');
    expect(compiled.querySelector('main')).toBeTruthy();
  });
});
