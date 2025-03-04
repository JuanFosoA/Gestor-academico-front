import { TestBed } from '@angular/core/testing';
import { RegistrationsService } from './registration.service';


describe('RegistrationService', () => {
  let service: RegistrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
