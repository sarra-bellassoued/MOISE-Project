import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComptableAfficheComponent } from './journal-comptable-affiche.component';

describe('JournalComptableAfficheComponent', () => {
  let component: JournalComptableAfficheComponent;
  let fixture: ComponentFixture<JournalComptableAfficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalComptableAfficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalComptableAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
