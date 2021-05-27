import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LayoutModule } from 'src/app/custom-layout/admin/layout/layout.module';
import { CustomLayoutComponent } from './custom-layout.component';
import { SidenavModule } from 'src/app/custom-layout/admin/layout/sidenav/sidenav.module';
import { ToolbarModule } from 'src/app/custom-layout/admin/layout/toolbar/toolbar.module';
import { FooterModule } from 'src/app/custom-layout/admin/layout/footer/footer.module';
import { ConfigPanelModule } from 'src/app/custom-layout/admin/components/config-panel/config-panel.module';
import { SidebarModule } from 'src/app/custom-layout/admin/components/sidebar/sidebar.module';
import { QuickpanelModule } from 'src/app/custom-layout/admin/layout/quickpanel/quickpanel.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule,
    MatRippleModule,
    MatDialogModule
  ]
})
export class CustomLayoutModule {
}
