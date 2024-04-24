import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoRiesgosComponent } from './seguimiento-riesgos.component';

describe('SeguimientoRiesgosComponent', () => {
  let component: SeguimientoRiesgosComponent;
  let fixture: ComponentFixture<SeguimientoRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
