import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaviconService } from './favicon';

describe('Favicon', () => {
  let component: FaviconService;
  let fixture: ComponentFixture<FaviconService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaviconService],
    }).compileComponents();

    fixture = TestBed.createComponent(FaviconService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
