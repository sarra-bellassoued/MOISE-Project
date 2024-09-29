import { TestBed } from '@angular/core/testing';

import { PieceComptableService } from './piece-comptable-service.service';

describe('PieceComptableServiceService', () => {
  let service: PieceComptableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceComptableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
