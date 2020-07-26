import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFooterOuterComponent } from './navbar-footer-outer.component';

describe('NavbarOutComponent', () => {
  let component: NavbarFooterOuterComponent;
  let fixture: ComponentFixture<NavbarFooterOuterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarFooterOuterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFooterOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
