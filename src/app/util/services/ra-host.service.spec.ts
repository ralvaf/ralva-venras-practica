import { TestBed } from '@angular/core/testing';

import { RaHostService } from './ra-host.service';

describe('RaHostService', () => {
  let service: RaHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
