import { Component, Input, signal, computed, inject, DestroyRef } from '@angular/core';
import { CarouselItem } from '../carousel-item/carousel-item';
import { Experience } from '../../info/experience-info';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-carousel',
  imports: [CarouselItem],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  @Input({ required: true }) items!: Experience[];

  protected currentIndex = signal(0);
  protected trackTransform = computed(() => `translateX(-${this.currentIndex() * 100}%)`);

  constructor() {
    const destroyRef = inject(DestroyRef);

    timer(8000, 8000).pipe(
      takeUntilDestroyed(destroyRef),
    ).subscribe(() => {
      this.currentIndex.update(i => (i + 1) % this.items.length);
    });
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
  }

  protected prev(): void {
    this.currentIndex.update(i => (i - 1 + this.items.length) % this.items.length);
  }

  protected next(): void {
    this.currentIndex.update(i => (i + 1) % this.items.length);
  }
}
