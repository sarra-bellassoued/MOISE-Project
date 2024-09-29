import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesComptableAfficheComponent } from './comptes-comptable-affiche.component';

describe('ComptesComptableAfficheComponent', () => {
  let component: ComptesComptableAfficheComponent;
  let fixture: ComponentFixture<ComptesComptableAfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesComptableAfficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesComptableAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
