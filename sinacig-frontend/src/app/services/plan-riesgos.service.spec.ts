import { TestBed } from '@angular/core/testing';

import { PlanRiesgosService } from './plan-riesgos.service';

describe('PlanRiesgosService', () => {
  let service: PlanRiesgosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRiesgosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
