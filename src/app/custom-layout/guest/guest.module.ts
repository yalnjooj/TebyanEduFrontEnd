import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { GuestLayoutModule } from 'src/app/custom-layout/guest/layout/layout.module';
import { SidenavModule } from 'src/app/custom-layout/guest/layout/sidenav/sidenav.module';
import { ToolbarModule } from 'src/app/custom-layout/guest/layout/toolbar/toolbar.module';
import { FooterModule } from 'src/app/custom-layout/guest/layout/footer/footer.module';
import { ConfigPanelModule } from 'src/app/custom-layout/guest/components/config-panel/config-panel.module';
import { SidebarModule } from 'src/app/custom-layout/guest/components/sidebar/sidebar.module';
import { QuickpanelModule } from 'src/app/custom-layout/guest/layout/quickpanel/quickpanel.module';
import { GuestRoutingModule } from './guest-routing.module';




@NgModule({
  declarations: [GuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    GuestLayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule
  ]
})
export class GuestModule { }
