import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TebyanLevel1Component } from './tebyan-level1.component';

describe('TebyanLevel1Component', () => {
  let component: TebyanLevel1Component;
  let fixture: ComponentFixture<TebyanLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TebyanLevel1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TebyanLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
