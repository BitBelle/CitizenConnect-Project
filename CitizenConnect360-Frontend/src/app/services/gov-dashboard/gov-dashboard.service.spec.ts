import { TestBed } from '@angular/core/testing';

import { GovDashboardService } from './gov-dashboard.service';

describe('GovDashboardService', () => {
  let service: GovDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
