import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { LanguageService } from '../../info/language-info';
import { LanguageSelector } from '../language-selector/language-selector';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LanguageSelector],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly languageService = inject(LanguageService);
  protected readonly navSections = this.languageService.navSections;

  private scaleX = signal(1);
  private scaleY = signal(1);
  protected transform = computed(() =>
    `translateX(-50%) scale(${this.scaleX()}, ${this.scaleY()})`,
  );

  private lastScrollY = 0;
  private lastTime = 0;
  private smoothSpeed = 0;
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.lastScrollY = window.scrollY;
    this.lastTime = performance.now();

    const destroyRef = inject(DestroyRef);

    fromEvent(window, 'scroll', { passive: true }).pipe(
      auditTime(16),
      takeUntilDestroyed(destroyRef),
    ).subscribe(() => this.calculateSquash());
  }

  private calculateSquash(): void {
    const now = performance.now();
    const scrollY = window.scrollY;
    const dt = now - this.lastTime;

    if (dt < 8) return;

    const rawSpeed = Math.abs(scrollY - this.lastScrollY) / (dt / 16.67);
    this.smoothSpeed += (rawSpeed - this.smoothSpeed) * 0.25;

    const factor = Math.min(this.smoothSpeed * 0.025, 1);

    this.scaleX.set(1 + factor * 0.06);
    this.scaleY.set(1 - factor * 0.06);

    this.lastScrollY = scrollY;
    this.lastTime = now;

    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => {
      this.scaleX.set(1);
      this.scaleY.set(1);
    }, 120);
  }
}
