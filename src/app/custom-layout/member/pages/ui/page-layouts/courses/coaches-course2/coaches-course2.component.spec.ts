import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesCourse2Component } from './coaches-course2.component';

describe('CoachesCourse2Component', () => {
  let component: CoachesCourse2Component;
  let fixture: ComponentFixture<CoachesCourse2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesCourse2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesCourse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
