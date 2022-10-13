import { TestBed } from '@angular/core/testing';

import { MatrizContinuidadService } from './matriz-continuidad.service';

describe('MatrizContinuidadService', () => {
  let service: MatrizContinuidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrizContinuidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
