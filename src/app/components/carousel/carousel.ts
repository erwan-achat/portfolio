import { Component, Input, signal, computed, inject, DestroyRef } from '@angular/core';
import { CarouselItem } from '../carousel-item/carousel-item';
import { Experience } from '../../info/experience-info';

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

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private pauseTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.startAutoSlide();
    destroyRef.onDestroy(() => {
      clearInterval(this.intervalId);
      clearTimeout(this.pauseTimer);
    });
  }

  private startAutoSlide(): void {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.items.length);
    }, 8000);
  }

  private pauseAutoSlide(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.pauseTimer);
    this.pauseTimer = setTimeout(() => this.startAutoSlide(), 10000);
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
    this.pauseAutoSlide();
  }

  protected prev(): void {
    this.currentIndex.update(i => (i - 1 + this.items.length) % this.items.length);
    this.pauseAutoSlide();
  }

  protected next(): void {
    this.currentIndex.update(i => (i + 1) % this.items.length);
    this.pauseAutoSlide();
  }
}
