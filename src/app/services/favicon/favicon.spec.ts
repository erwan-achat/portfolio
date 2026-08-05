import { TestBed } from '@angular/core/testing';

import { FaviconService } from './favicon';

describe('Favicon', () => {
  let component: FaviconService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FaviconService],
    }).compileComponents();

    component = TestBed.inject(FaviconService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
