import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminLayoutModule } from 'src/app/custom-layout/admin/layout/layout.module';
import { SidenavModule } from 'src/app/custom-layout/admin/layout/sidenav/sidenav.module';
import { ToolbarModule } from 'src/app/custom-layout/admin/layout/toolbar/toolbar.module';
import { FooterModule } from 'src/app/custom-layout/admin/layout/footer/footer.module';
import { ConfigPanelModule } from 'src/app/custom-layout/admin/components/config-panel/config-panel.module';
import { SidebarModule } from 'src/app/custom-layout/admin/components/sidebar/sidebar.module';
import { QuickpanelModule } from 'src/app/custom-layout/admin/layout/quickpanel/quickpanel.module';
import { AdminRoutingModule } from './admin-routing.module';




@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule
  ]
})
export class AdminModule { }
