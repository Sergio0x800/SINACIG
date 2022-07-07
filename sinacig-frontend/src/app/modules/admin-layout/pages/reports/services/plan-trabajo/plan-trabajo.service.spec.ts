import { TestBed } from '@angular/core/testing';

import { PlanTrabajoService } from './plan-trabajo.service';

describe('PlanTrabajoService', () => {
  let service: PlanTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
