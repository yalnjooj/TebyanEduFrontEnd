import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent, DialogAddCertificate } from './certificates.component';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { CustomerCreateUpdateModule } from 'src/app/custom-layout/member/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConformDialogComponent } from 'src/app/custom-layout/member/layout/dialogs/conformDialog/conform.dialog.component'

@NgModule({
  declarations: [CertificatesComponent, DialogAddCertificate, ConformDialogComponent],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    SecondaryToolbarModule,
    ContainerModule,
    IconModule,
    MatIconModule,
    FlexLayoutModule,
    PageLayoutModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificatesModule {
}
