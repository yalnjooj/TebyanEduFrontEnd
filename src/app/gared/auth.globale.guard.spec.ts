import { TestBed } from '@angular/core/testing';

import { AuthGlobalGuard } from './auth.globale.guard';

describe('AothService', () => {
  let service: AuthGlobalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGlobalGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
