import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateModule } from './certificate.component';

describe('CertificateModule', () => {
  let component: CertificateModule;
  let fixture: ComponentFixture<CertificateModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
