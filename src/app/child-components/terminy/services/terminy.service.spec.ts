import { TestBed } from '@angular/core/testing';

import { TerminyService } from './terminy.service';

describe('TerminyService', () => {
  let service: TerminyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
