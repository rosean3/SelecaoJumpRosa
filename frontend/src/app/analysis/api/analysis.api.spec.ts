import { TestBed } from '@angular/core/testing';

import { AnalysisApiService } from './analysis.api';

describe('AnalysisApiService', () => {
  let service: AnalysisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
