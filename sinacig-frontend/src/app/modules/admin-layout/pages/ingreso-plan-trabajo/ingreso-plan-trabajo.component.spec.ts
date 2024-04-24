import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPlanTrabajoComponent } from './ingreso-plan-trabajo.component';

describe('IngresoPlanTrabajoComponent', () => {
  let component: IngresoPlanTrabajoComponent;
  let fixture: ComponentFixture<IngresoPlanTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoPlanTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
