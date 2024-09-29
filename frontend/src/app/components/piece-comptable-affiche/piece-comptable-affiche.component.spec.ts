import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceComptableAfficheComponent } from './piece-comptable-affiche.component';

describe('PieceComptableAfficheComponent', () => {
  let component: PieceComptableAfficheComponent;
  let fixture: ComponentFixture<PieceComptableAfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceComptableAfficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceComptableAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
