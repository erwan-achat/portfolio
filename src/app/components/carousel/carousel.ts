import { Component, Input, signal, computed, inject, DestroyRef, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { NgStyle } from '@angular/common';
import { CarouselItem } from '../carousel-item/carousel-item';
import { Experience } from '../../info/experience-info';

@Component({
  selector: 'app-carousel',
  imports: [CarouselItem, NgStyle],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements AfterViewInit {
  @Input({ required: true }) items!: Experience[];

  protected currentIndex = signal(0);
  protected slideWidth = signal(0);
  protected trackTransform = computed(() => `translateX(-${this.currentIndex() * this.slideWidth()}px)`);
  protected slideStyle = computed(() => this.slideWidth() ? { width: this.slideWidth() + 'px' } : {});

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private pauseTimer: ReturnType<typeof setTimeout> | undefined;
  private resizeObserver: ResizeObserver | undefined;
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.startAutoSlide();
    destroyRef.onDestroy(() => {
      clearInterval(this.intervalId);
      clearTimeout(this.pauseTimer);
      this.resizeObserver?.disconnect();
    });
  }

  ngAfterViewInit(): void {
    const measure = () => {
      const width = (this.el.nativeElement as HTMLElement).getBoundingClientRect().width;
      this.zone.run(() => this.slideWidth.set(width));
    };
    measure();
    this.resizeObserver = new ResizeObserver(measure);
    this.resizeObserver.observe(this.el.nativeElement);
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
    this.pauseTimer = setTimeout(() => this.startAutoSlide(), 30000);
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
