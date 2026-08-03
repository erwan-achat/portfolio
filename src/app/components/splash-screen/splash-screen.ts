import { Component, output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.css',
})
export class SplashScreen {
  done = output<void>();

  private ended = false;

  constructor() {
    // Fallback in case CSS animations are disabled (e.g. prefers-reduced-motion).
    setTimeout(() => this.finish(), 5000);
  }

  onDone(event: AnimationEvent) {
    if (event.animationName !== 'overlay-out') return;
    this.finish();
  }

  private finish() {
    if (this.ended) return;
    this.ended = true;
    this.done.emit();
  }
}
