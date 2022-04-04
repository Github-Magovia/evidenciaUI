import { TestBed } from '@angular/core/testing';

import { VakcinaService } from './vakcina.service';

describe('VakcinaService', () => {
  let service: VakcinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VakcinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
