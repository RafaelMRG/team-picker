import { TestBed } from '@angular/core/testing';

import { PreDefinedManagerService } from './pre-defined-manager.service';

describe('PreDefinedManagerService', () => {
  let service: PreDefinedManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreDefinedManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
