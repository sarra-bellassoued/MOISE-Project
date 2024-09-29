import { TestBed } from '@angular/core/testing';

import { JournalComptableService } from './journal-comptable-service.service';

describe('JournalComptableServiceService', () => {
  let service: JournalComptableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalComptableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
