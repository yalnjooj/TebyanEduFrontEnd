import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/@vex/services/layout.service';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { checkRouterChildsData } from 'src/@vex/utils/check-router-childs-data';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfigService } from 'src/@vex/services/config.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarComponent } from 'src/app/custom-layout/guest/components/sidebar/sidebar.component';
import { NavigationService } from 'src/@vex/services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icChat from '@iconify/icons-ic/twotone-chat';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icLock from '@iconify/icons-ic/twotone-lock';
import icWatchLater from '@iconify/icons-ic/twotone-watch-later';
import icError from '@iconify/icons-ic/twotone-error';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icHelp from '@iconify/icons-ic/twotone-help';
import icBook from '@iconify/icons-ic/twotone-book';
import icBubbleChart from '@iconify/icons-ic/twotone-bubble-chart';
import icFormatColorText from '@iconify/icons-ic/twotone-format-color-text';
import icStar from '@iconify/icons-ic/twotone-star';
import icViewCompact from '@iconify/icons-ic/twotone-view-compact';
import icPictureInPicture from '@iconify/icons-ic/twotone-picture-in-picture';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icUpdate from '@iconify/icons-ic/twotone-update';
import icChromeReaderMode from '@iconify/icons-ic/twotone-chrome-reader-mode';
import icMail from '@iconify/icons-ic/twotone-mail';

@UntilDestroy()
@Component({
  selector: 'vex-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  title = 'vex';

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled))
  );

  @ViewChild('configpanel', { static: true }) configpanel: SidebarComponent;

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private navigationService: NavigationService,
    private translate: TranslateService
  ) {

    //Customize the template to your needs with the ConfigService
    //   Example:
    this.configService.updateConfig({
      sidenav: {
        title: 'بصائر',
        imageUrl: 'https://aiim.com/wp-content/uploads/2019/06/print2-100x100.png',
        showCollapsePin: true
      },
      footer: {
        visible: true
      }
    });

    this.translate.get('ROOT.MAIN_SIDE_LIST').subscribe((translate: any) => {

      /**
      * Add your own routes here
      */
      this.navigationService.items = [
        {
          type: 'link',
          label: translate.dashboard,
          route: '/guest',
          icon: icLayers,
          routerLinkActiveOptions: { exact: true }
        },
        {
          type: 'subheading',
          label: translate.apps,
          children: [
            {
              type: 'link',
              label: translate.all_In_One,
              route: '/guest/apps/aio-table',
              icon: icAssigment
            },
            {
              type: 'dropdown',
              label: translate.helpCenter,
              icon: icContactSupport,
              children: [
                {
                  type: 'link',
                  label: 'Getting Started',
                  route: '/guest/apps/help-center/getting-started'
                },
                {
                  type: 'link',
                  label: 'Pricing & Plans',
                  route: '/guest/apps/help-center/pricing'
                },
                {
                  type: 'link',
                  label: 'FAQ',
                  route: '/guest/apps/help-center/faq'
                },
                {
                  type: 'link',
                  label: 'Guides',
                  route: '/guest/apps/help-center/guides'
                }
              ]
            },
            {
              type: 'link',
              label: translate.calendar,
              route: '/guest/apps/calendar',
              icon: icDateRange,
              badge: {
                value: '12',
                bgClass: 'bg-deep-purple',
                textClass: 'text-deep-purple-contrast',
              },
            },
            {
              type: 'link',
              label: translate.chat,
              route: '/guest/apps/chat',
              icon: icChat,
              badge: {
                value: '16',
                bgClass: 'bg-cyan',
                textClass: 'text-cyan-contrast',
              },
            },
            {
              type: 'link',
              label: translate.mailbox,
              route: '/guest/apps/mail',
              icon: icMail,
            },
            {
              type: 'dropdown',
              label: translate.social,
              icon: icPersonOutline,
              children: [
                {
                  type: 'link',
                  label: 'Profile',
                  route: '/guest/apps/social',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Timeline',
                  route: '/guest/apps/social/timeline'
                },
              ]
            },
            {
              type: 'link',
              label: translate.WYSIWYG_Editor,
              route: '/guest/apps/editor',
              icon: icChromeReaderMode
            },
            {
              type: 'dropdown',
              label: translate.contacts,
              icon: icContacts,
              children: [
                {
                  type: 'link',
                  label: 'List - Grid',
                  route: '/guest/apps/contacts/grid',
                },
                {
                  type: 'link',
                  label: 'List - Table',
                  route: '/guest/apps/contacts/table',
                }
              ]
            },
            {
              type: 'link',
              label: translate.scrumboard,
              route: '/guest/apps/scrumboard',
              icon: icAssessment,
              badge: {
                value: 'NEW',
                bgClass: 'bg-primary',
                textClass: 'text-primary-contrast',
              }
            },
          ]
        },
        {
          type: 'subheading',
          label: translate.pages,
          children: [
            {
              type: 'dropdown',
              label: translate.authentication,
              icon: icLock,
              children: [
                {
                  type: 'link',
                  label: 'Login',
                  route: '/login'
                },
                {
                  type: 'link',
                  label: 'Register',
                  route: '/register'
                },
                {
                  type: 'link',
                  label: 'Forgot Password',
                  route: '/forgot-password'
                },
                {
                  type: 'link',
                  label: 'Reset Password',
                  route: '/reset-password'
                }
              ]
            },
            {
              type: 'link',
              label: translate.comingSoon,
              icon: icWatchLater,
              route: '/coming-soon'
            },
            {
              type: 'dropdown',
              label: translate.errors,
              icon: icError,
              badge: {
                value: '4',
                bgClass: 'bg-green',
                textClass: 'text-green-contrast',
              },
              children: [
                {
                  type: 'link',
                  label: '404',
                  route: '/guest/pages/error-404'
                },
                {
                  type: 'link',
                  label: '500',
                  route: '/guest/pages/error-500'
                }
              ]
            },
            {
              type: 'link',
              label: translate.pricing,
              icon: icAttachMoney,
              route: '/guest/pages/pricing'
            },
            {
              type: 'link',
              label: translate.invoice,
              icon: icReceipt,
              route: '/guest/pages/invoice'
            },
            {
              type: 'link',
              label: translate.FAQ,
              icon: icHelp,
              route: '/guest/pages/faq'
            },
            {
              type: 'link',
              label: translate.guides,
              icon: icBook,
              route: '/guest/pages/guides',
              badge: {
                value: '18',
                bgClass: 'bg-teal',
                textClass: 'text-teal-contrast',
              },
            },
          ]
        },
        {
          type: 'subheading',
          label: translate.UI_Elements,
          children: [
            {
              type: 'dropdown',
              label: translate.components,
              icon: icBubbleChart,
              children: [
                {
                  type: 'link',
                  label: 'Overview',
                  route: '/guest/ui/components/overview'
                },
                {
                  type: 'link',
                  label: 'Autocomplete',
                  route: '/guest/ui/components/autocomplete'
                },
                {
                  type: 'link',
                  label: 'Buttons',
                  route: '/guest/ui/components/buttons'
                },
                {
                  type: 'link',
                  label: 'Button Group',
                  route: '/guest/ui/components/button-group'
                },
                {
                  type: 'link',
                  label: 'Cards',
                  route: '/guest/ui/components/cards'
                },
                {
                  type: 'link',
                  label: 'Checkbox',
                  route: '/guest/ui/components/checkbox'
                },
                {
                  type: 'link',
                  label: 'Dialogs',
                  route: '/guest/ui/components/dialogs'
                },
                {
                  type: 'link',
                  label: 'Grid List',
                  route: '/guest/ui/components/grid-list'
                },
                {
                  type: 'link',
                  label: 'Input',
                  route: '/guest/ui/components/input'
                },
                {
                  type: 'link',
                  label: 'Lists',
                  route: '/guest/ui/components/lists'
                },
                {
                  type: 'link',
                  label: 'Menu',
                  route: '/guest/ui/components/menu'
                },
                {
                  type: 'link',
                  label: 'Progress',
                  route: '/guest/ui/components/progress'
                },
                {
                  type: 'link',
                  label: 'Progress Spinner',
                  route: '/guest/ui/components/progress-spinner'
                },
                {
                  type: 'link',
                  label: 'Radio',
                  route: '/guest/ui/components/radio'
                },
                {
                  type: 'link',
                  label: 'Slide Toggle',
                  route: '/guest/ui/components/slide-toggle'
                },
                {
                  type: 'link',
                  label: 'Slider',
                  route: '/guest/ui/components/slider'
                },
                {
                  type: 'link',
                  label: 'Snack Bar',
                  route: '/guest/ui/components/snack-bar'
                },
                {
                  type: 'link',
                  label: 'Tooltip',
                  route: '/guest/ui/components/tooltip'
                },
              ]
            },
            {
              type: 'dropdown',
              label: translate.forms,
              icon: icFormatColorText,
              children: [
                {
                  type: 'link',
                  label: 'Form Elements',
                  route: '/guest/ui/forms/form-elements'
                },
                {
                  type: 'link',
                  label: 'Form Wizard',
                  route: '/guest/ui/forms/form-wizard'
                }
              ]
            },
            {
              type: 'dropdown',
              label: translate.icons,
              icon: icStar,
              children: [
                {
                  type: 'link',
                  label: 'Material Icons',
                  route: '/guest/ui/icons/ic'
                },
                {
                  type: 'link',
                  label: 'FontAwesome Icons',
                  route: '/guest/ui/icons/fa'
                }
              ]
            },
            {
              type: 'dropdown',
              label: translate.pageLayouts,
              icon: icViewCompact,
              children: [
                {
                  type: 'dropdown',
                  label: 'Card',
                  children: [
                    {
                      type: 'link',
                      label: 'Default',
                      route: '/guest/ui/page-layouts/card',
                      routerLinkActiveOptions: { exact: true }
                    },
                    {
                      type: 'link',
                      label: 'Tabbed',
                      route: '/guest/ui/page-layouts/card/tabbed',
                    },
                    {
                      type: 'link',
                      label: 'Large Header',
                      route: '/guest/ui/page-layouts/card/large-header',
                      routerLinkActiveOptions: { exact: true }
                    },
                    {
                      type: 'link',
                      label: 'Tabbed & Large Header',
                      route: '/guest/ui/page-layouts/card/large-header/tabbed'
                    }
                  ]
                },
                {
                  type: 'dropdown',
                  label: 'Simple',
                  children: [
                    {
                      type: 'link',
                      label: 'Default',
                      route: '/guest/ui/page-layouts/simple',
                      routerLinkActiveOptions: { exact: true }
                    },
                    {
                      type: 'link',
                      label: 'Tabbed',
                      route: '/guest/ui/page-layouts/simple/tabbed',
                    },
                    {
                      type: 'link',
                      label: 'Large Header',
                      route: '/guest/ui/page-layouts/simple/large-header',
                      routerLinkActiveOptions: { exact: true }
                    },
                    {
                      type: 'link',
                      label: 'Tabbed & Large Header',
                      route: '/guest/ui/page-layouts/simple/large-header/tabbed'
                    }
                  ]
                },
                {
                  type: 'link',
                  label: 'Blank',
                  icon: icPictureInPicture,
                  route: '/guest/ui/page-layouts/blank'
                },
              ]
            },
          ]
        },
        {
          type: 'subheading',
          label: translate.documentation,
          children: [
            {
              type: 'link',
              label: translate.changelog,
              route: '/guest/documentation/changelog',
              icon: icUpdate
            },
            {
              type: 'dropdown',
              label: translate.gettingStarted,
              icon: icBook,
              children: [
                {
                  type: 'link',
                  label: 'Introduction',
                  route: '/guest/documentation/introduction',
                  fragment: 'introduction',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Folder Structure',
                  route: '/guest/documentation/folder-structure',
                  fragment: 'folder-structure',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Installation',
                  route: '/guest/documentation/installation',
                  fragment: 'installation',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Development Server',
                  route: '/guest/documentation/start-development-server',
                  fragment: 'start-development-server',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Build for Production',
                  route: '/guest/documentation/build-for-production',
                  fragment: 'build-for-production',
                  routerLinkActiveOptions: { exact: true }
                }
              ]
            },
            {
              type: 'dropdown',
              label: translate.customization,
              icon: icBook,
              children: [
                {
                  type: 'link',
                  label: 'Configuration',
                  route: '/guest/documentation/configuration',
                  fragment: 'configuration',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Changing Styling',
                  route: '/guest/documentation/changing-styling-and-css-variables',
                  fragment: 'changing-styling-and-css-variables',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Using Custom Colors',
                  route: '/guest/documentation/using-custom-colors-for-the-primarysecondarywarn-palettes',
                  fragment: 'using-custom-colors-for-the-primarysecondarywarn-palettes',
                  routerLinkActiveOptions: { exact: true }
                },
                {
                  type: 'link',
                  label: 'Adding Menu Items',
                  route: '/guest/documentation/adding-menu-items',
                  fragment: 'adding-menu-items',
                  routerLinkActiveOptions: { exact: true }
                },
              ]
            },
            {
              type: 'link',
              label: translate.furtherHelp,
              icon: icBook,
              route: '/guest/documentation/further-help',
              fragment: 'further-help',
              routerLinkActiveOptions: { exact: true }
            },
          ]
        },
        {
          type: 'subheading',
          label: translate.customize,
          children: []
        },
        {
          type: 'link',
          label: translate.configuration,
          route: () => this.layoutService.openConfigpanel(),
          icon: icSettings
        }
      ];

    });

  }

  ngOnInit() {
    this.layoutService.configpanelOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.configpanel.open() : this.configpanel.close());
  }

}
