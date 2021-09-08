import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersDataComponent } from './teachers-data.component';

describe('TeachersDataComponent', () => {
  let component: TeachersDataComponent;
  let fixture: ComponentFixture<TeachersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
