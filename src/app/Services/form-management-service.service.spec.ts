import { TestBed } from '@angular/core/testing';

import { FormManagementServiceService } from './form-management-service.service';

describe('FormManagementServiceService', () => {
  let service: FormManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
