import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionRiesgoReporteComponent } from './evaluacion-riesgo-reporte.component';

describe('EvaluacionRiesgoReporteComponent', () => {
  let component: EvaluacionRiesgoReporteComponent;
  let fixture: ComponentFixture<EvaluacionRiesgoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionRiesgoReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionRiesgoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
