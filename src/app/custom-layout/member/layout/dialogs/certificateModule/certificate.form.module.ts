import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateFormRoutingModule } from './certificate-form-routing.module';
import { CertificateFormComponent } from './certificate.form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [CertificateFormComponent],
  imports: [
    CommonModule,
    CertificateFormRoutingModule,
    MatDialogModule,
    DragDropModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    GridsterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificateFormModule {
}
