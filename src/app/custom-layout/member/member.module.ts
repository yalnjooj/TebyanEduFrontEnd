import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member-routing.module';
import { MemberLayoutModule } from 'src/app/custom-layout/member/layout/layout.module';
import { SidenavModule } from 'src/app/custom-layout/member/layout/sidenav/sidenav.module';
import { ToolbarModule } from 'src/app/custom-layout/member/layout/toolbar/toolbar.module';
import { FooterModule } from 'src/app/custom-layout/member/layout/footer/footer.module';
import { ConfigPanelModule } from 'src/app/custom-layout/member/components/config-panel/config-panel.module';
import { SidebarModule } from 'src/app/custom-layout/member/components/sidebar/sidebar.module';
import { QuickpanelModule } from 'src/app/custom-layout/member/layout/quickpanel/quickpanel.module';
import { MemberComponent } from './member.component';


@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MemberLayoutModule,
    SidenavModule,
    ToolbarModule,
    FooterModule,
    ConfigPanelModule,
    SidebarModule,
    QuickpanelModule
  ]
})
export class MemberModule { }
