import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResCollFormComponent } from './res-coll-form.component';

describe('ResCollFormComponent', () => {
  let component: ResCollFormComponent;
  let fixture: ComponentFixture<ResCollFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResCollFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResCollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
