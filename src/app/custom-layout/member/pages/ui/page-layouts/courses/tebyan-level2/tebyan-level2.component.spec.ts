import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TebyanLevel2Component } from './tebyan-level2.component';

describe('TebyanLevel2Component', () => {
  let component: TebyanLevel2Component;
  let fixture: ComponentFixture<TebyanLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TebyanLevel2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TebyanLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
