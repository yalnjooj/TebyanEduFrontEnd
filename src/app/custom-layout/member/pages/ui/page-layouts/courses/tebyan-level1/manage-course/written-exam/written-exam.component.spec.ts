import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenExamComponent } from './written-exam.component';

describe('WrittenExamComponent', () => {
  let component: WrittenExamComponent;
  let fixture: ComponentFixture<WrittenExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittenExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrittenExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
