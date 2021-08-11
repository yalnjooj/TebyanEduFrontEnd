import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesCourse1Component } from './coaches-course1.component';

describe('CoachesCourse1Component', () => {
  let component: CoachesCourse1Component;
  let fixture: ComponentFixture<CoachesCourse1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesCourse1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesCourse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
