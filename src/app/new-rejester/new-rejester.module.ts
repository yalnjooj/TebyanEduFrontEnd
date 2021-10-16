import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NewRejesterComponent } from './new-rejester.component';
import { NewRejesterRoutingModule } from './new-rejester-routing.module';
import { SharedModuleModule } from './SharedModule.module';

@NgModule({
  declarations: [NewRejesterComponent],
  imports: [
    CommonModule,
    NewRejesterRoutingModule,
    SharedModuleModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class NewRejesterModule {
}
