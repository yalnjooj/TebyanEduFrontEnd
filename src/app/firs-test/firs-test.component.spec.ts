import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirsTestComponent } from './firs-test.component';

describe('FirsTestComponent', () => {
  let component: FirsTestComponent;
  let fixture: ComponentFixture<FirsTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FirsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
