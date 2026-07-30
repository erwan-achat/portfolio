import { Component, output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.css',
})
export class SplashScreen {
  done = output<void>();

  letters = 'Bienvenue'.split('');

  private ended = false;

  onDone(event: AnimationEvent) {
    if (this.ended) return;
    const target = event.target as HTMLElement;
    if (!target.classList.contains('splash-overlay')) return;
    this.ended = true;
    this.done.emit();
  }
}
