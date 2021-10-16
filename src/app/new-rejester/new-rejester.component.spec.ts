import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRejesterComponent } from './new-rejester.component';

describe('NewRejesterComponent', () => {
  let component: NewRejesterComponent;
  let fixture: ComponentFixture<NewRejesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRejesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRejesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
