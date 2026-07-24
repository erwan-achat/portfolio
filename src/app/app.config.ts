import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { personalInfo, PERSONAL_INFO } from './info/personal-info';
import { timelineSections, TIMELINE_SECTIONS } from './info/timeline-info';
import { navSections, NAV_SECTIONS } from './info/section-info';
import { experiences, EXPERIENCES } from './info/experience-info';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: PERSONAL_INFO, useValue: personalInfo },
    { provide: TIMELINE_SECTIONS, useValue: timelineSections },
    { provide: NAV_SECTIONS, useValue: navSections },
    { provide: EXPERIENCES, useValue: experiences },
  ],
};
