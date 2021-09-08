import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTestsComponent } from './short-tests.component';

describe('ShortTestsComponent', () => {
  let component: ShortTestsComponent;
  let fixture: ComponentFixture<ShortTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
