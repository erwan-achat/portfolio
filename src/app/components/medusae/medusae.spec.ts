import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Medusae } from './medusae';

describe('Medusae', () => {
  let component: Medusae;
  let fixture: ComponentFixture<Medusae>;

  beforeEach(async () => {
    TestBed.overrideComponent(Medusae, { set: { template: '' } });
    await TestBed.configureTestingModule({
      imports: [Medusae],
    }).compileComponents();

    fixture = TestBed.createComponent(Medusae);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('merges custom colors into the default configuration', () => {
    component.config = { particles: { colorOne: '#123456' } };
    component.ngOnChanges({
      config: {
        currentValue: component.config,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect((component as any).merged.particles.colorOne).toBe('#123456');
    expect((component as any).merged.particles.colorTwo).toBe('#eb4236');
  });
});
