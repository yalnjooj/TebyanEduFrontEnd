import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateViewRoutingModule } from './certificate-view-routing.module';
import { CertificateViewComponent } from './certificate.view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { GridsterModule } from 'angular-gridster2';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { ViewImagsModule } from 'src/@vex/pipes/view-Imags/view-Imags.module';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [CertificateViewComponent],
  imports: [
    CommonModule,
    CertificateViewRoutingModule,
    MatDialogModule,
    DragDropModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    GridsterModule,
    MatCheckboxModule,
    FormsModule,
    ViewImagsModule,
    RichTextEditorAllModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificateViewModule {
}
