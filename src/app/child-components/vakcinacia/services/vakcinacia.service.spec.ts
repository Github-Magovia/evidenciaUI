import { TestBed } from '@angular/core/testing';

import { VakcinaciaService } from './vakcinacia.service';

describe('VakcinaciaService', () => {
  let service: VakcinaciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VakcinaciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
