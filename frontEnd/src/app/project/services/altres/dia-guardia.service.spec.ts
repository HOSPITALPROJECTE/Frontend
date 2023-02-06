import { TestBed } from '@angular/core/testing';

import { DiaGuardiaService } from './dia-guardia.service';

describe('DiaGuardiaService', () => {
  let service: DiaGuardiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaGuardiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
