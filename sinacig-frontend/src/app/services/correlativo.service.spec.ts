import { TestBed } from '@angular/core/testing';

import { CorrelativoService } from './correlativo.service';

describe('CorrelativoService', () => {
  let service: CorrelativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrelativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
