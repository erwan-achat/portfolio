import { InjectionToken } from '@angular/core';

export const ASSET_BASE = new InjectionToken<string>('ASSET_BASE', {
  factory: () => {
    const base = document.querySelector('base')?.getAttribute('href') ?? '/';
    return base.endsWith('/') ? base : base + '/';
  },
});
