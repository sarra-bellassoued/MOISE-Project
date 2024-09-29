import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPieceComptableComponent } from './edit-piece-comptable.component';

describe('EditPieceComptableComponent', () => {
  let component: EditPieceComptableComponent;
  let fixture: ComponentFixture<EditPieceComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPieceComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPieceComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
