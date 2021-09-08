import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralExamComponent } from './oral-exam.component';

describe('OralExamComponent', () => {
  let component: OralExamComponent;
  let fixture: ComponentFixture<OralExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OralExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
