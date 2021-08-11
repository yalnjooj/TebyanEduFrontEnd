import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionCourseComponent } from './supervision-course.component';

describe('SupervisionCourseComponent', () => {
  let component: SupervisionCourseComponent;
  let fixture: ComponentFixture<SupervisionCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
