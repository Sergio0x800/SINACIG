import { TestBed } from '@angular/core/testing';

import { EvaluacionRiesgoReporteService } from './evaluacion-riesgo-reporte.service';

describe('EvaluacionRiesgoReporteService', () => {
  let service: EvaluacionRiesgoReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionRiesgoReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
