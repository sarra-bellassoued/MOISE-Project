import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComptableComponent } from './journal-comptable.component';

describe('JournalComptableComponent', () => {
  let component: JournalComptableComponent;
  let fixture: ComponentFixture<JournalComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
