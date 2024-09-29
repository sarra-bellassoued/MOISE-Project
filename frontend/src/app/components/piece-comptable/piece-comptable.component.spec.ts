import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceComptableComponent } from './piece-comptable.component';

describe('PieceComptableComponent', () => {
  let component: PieceComptableComponent;
  let fixture: ComponentFixture<PieceComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
