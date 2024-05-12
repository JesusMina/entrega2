import { TestBed } from '@angular/core/testing';

import { PalabraService } from './palabra.service';

describe('PalabraService', () => {
  let service: PalabraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalabraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
