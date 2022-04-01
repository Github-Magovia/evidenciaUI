import { TestBed } from '@angular/core/testing';

import { OsobyService } from './osoby.service';

describe('OsobyService', () => {
  let service: OsobyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsobyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
