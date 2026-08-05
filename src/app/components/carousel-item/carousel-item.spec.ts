import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItem } from './carousel-item';
import { experiences } from '../../info/experience-info';

describe('CarouselItem', () => {
  let component: CarouselItem;
  let fixture: ComponentFixture<CarouselItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselItem);
    component = fixture.componentInstance;
    component.item = experiences[0];
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
