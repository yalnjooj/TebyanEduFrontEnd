import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PopoverService } from 'src/app/custom-layout/member/components/popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-emoji-events';
import { AioTableComponent } from 'src/app/custom-layout/guest/pages/apps/aio-table/aio-table.component';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarUserComponent implements OnInit {
  companyName: string
  avatar: string
  dropdownOpen: boolean;
  icPerson = icPerson;
  @Input() data: any;
  
  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef,
              private apollo: Apollo) { }

  ngOnInit() {
    this.data.then(d =>{
      this.companyName = d.companyName
      this.avatar = d.avatar
    })

  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
