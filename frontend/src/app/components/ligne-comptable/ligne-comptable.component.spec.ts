import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneComptableComponent } from './ligne-comptable.component';

describe('LigneComptableComponent', () => {
  let component: LigneComptableComponent;
  let fixture: ComponentFixture<LigneComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
