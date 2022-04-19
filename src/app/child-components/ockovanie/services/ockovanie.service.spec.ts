import { TestBed } from '@angular/core/testing';

import { OckovanieService } from './ockovanie.service';

describe('OckovanieService', () => {
  let service: OckovanieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OckovanieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
