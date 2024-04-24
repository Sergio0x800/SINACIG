import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizContinuidadReporteComponent } from './matriz-continuidad-reporte.component';

describe('MatrizContinuidadReporteComponent', () => {
  let component: MatrizContinuidadReporteComponent;
  let fixture: ComponentFixture<MatrizContinuidadReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizContinuidadReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizContinuidadReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
