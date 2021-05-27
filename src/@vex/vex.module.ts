import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from 'src/app/custom-layout/admin/layout/layout.module';
import { MemberLayoutModule } from 'src/app/custom-layout/member/layout/layout.module';
import { GuestLayoutModule } from 'src/app/custom-layout/guest/layout/layout.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    AdminLayoutModule,
    MemberLayoutModule,
    GuestLayoutModule
  ],
  exports: [
    AdminLayoutModule,
    MemberLayoutModule,
    GuestLayoutModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class VexModule {
}
