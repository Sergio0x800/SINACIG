import { TestBed } from '@angular/core/testing';

import { RiesgosService } from './riesgos.service';

describe('RiesgosService', () => {
  let service: RiesgosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
