import { TestBed } from '@angular/core/testing';

import { IsaacDzata } from './isaac-data';

describe('IsaacData', () => {
  let service: IsaacData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsaacData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
