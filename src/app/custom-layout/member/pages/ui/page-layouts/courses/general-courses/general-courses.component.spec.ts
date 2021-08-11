import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCoursesComponent } from './general-courses.component';

describe('GeneralCoursesComponent', () => {
  let component: GeneralCoursesComponent;
  let fixture: ComponentFixture<GeneralCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
