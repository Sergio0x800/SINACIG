import { TestBed } from '@angular/core/testing';

import { MapaRiesgoService } from './mapa-riesgo.service';

describe('MapaRiesgoService', () => {
  let service: MapaRiesgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaRiesgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
