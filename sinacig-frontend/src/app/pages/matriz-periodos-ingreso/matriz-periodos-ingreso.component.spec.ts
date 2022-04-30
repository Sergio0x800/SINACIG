import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPeriodosIngresoComponent } from './matriz-periodos-ingreso.component';

describe('MatrizPeriodosIngresoComponent', () => {
  let component: MatrizPeriodosIngresoComponent;
  let fixture: ComponentFixture<MatrizPeriodosIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizPeriodosIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizPeriodosIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
