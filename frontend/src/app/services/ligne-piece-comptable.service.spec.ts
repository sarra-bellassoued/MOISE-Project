import { TestBed } from '@angular/core/testing';

import { LignePieceComptableService } from './ligne-piece-comptable.service';

describe('LignePieceComptableService', () => {
  let service: LignePieceComptableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignePieceComptableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
