import { TestBed } from '@angular/core/testing';

import { AppDataResolverService } from './app-data-resolver.service';

describe('DataResolverService', () => {
  let service: AppDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
