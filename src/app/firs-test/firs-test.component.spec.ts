import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsTestComponent } from './firs-test.component';

describe('FirsTestComponent', () => {
  let component: FirsTestComponent;
  let fixture: ComponentFixture<FirsTestComponent>;

  beforeEach(async(() => {
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
