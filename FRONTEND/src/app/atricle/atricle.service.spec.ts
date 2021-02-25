import { TestBed } from '@angular/core/testing';

import { AtricleService } from './atricle.service';

describe('AtricleService', () => {
  let service: AtricleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtricleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
