import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuestComponent } from './guest.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'dashboards/analytics',
        redirectTo: '/'
      },
      {
        path: '',
        loadChildren: () => import('src/app/custom-layout/guest/pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      },
      {
        path: 'apps',
        children: [
          {
            path: 'chat',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/chat/chat.module').then(m => m.ChatModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'mail',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/mail/mail.module').then(m => m.MailModule),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true
            }
          },
          {
            path: 'social',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/social/social.module').then(m => m.SocialModule)
          },
          {
            path: 'contacts',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
          },
          {
            path: 'calendar',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'aio-table',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/aio-table/aio-table.module').then(m => m.AioTableModule),
          },
          {
            path: 'help-center',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/help-center/help-center.module').then(m => m.HelpCenterModule),
          },
          {
            path: 'scrumboard',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
          },
          {
            path: 'editor',
            loadChildren: () => import('src/app/custom-layout/guest/pages/apps/editor/editor.module').then(m => m.EditorModule),
          },
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'pricing',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/pricing/pricing.module').then(m => m.PricingModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/faq/faq.module').then(m => m.FaqModule)
          },
          {
            path: 'guides',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/guides/guides.module').then(m => m.GuidesModule)
          },
          {
            path: 'invoice',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/invoice/invoice.module').then(m => m.InvoiceModule)
          },
          {
            path: 'error-404',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
          },
          {
            path: 'error-500',
            loadChildren: () => import('src/app/custom-layout/guest/pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'components',
            loadChildren: () => import('src/app/custom-layout/guest/pages/ui/components/components.module').then(m => m.ComponentsModule),
          },
          {
            path: 'forms/form-elements',
            loadChildren: () => import('src/app/custom-layout/guest/pages/ui/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'forms/form-wizard',
            loadChildren: () => import('src/app/custom-layout/guest/pages/ui/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
            data: {
              containerEnabled: true
            }
          },
          {
            path: 'icons',
            loadChildren: () => import('src/app/custom-layout/guest/pages/ui/icons/icons.module').then(m => m.IconsModule)
          },
          {
            path: 'page-layouts',
            loadChildren: () => import('src/app/custom-layout/guest/pages/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
          },
        ]
      },
      {
        path: 'documentation',
        loadChildren: () => import('src/app/custom-layout/guest/pages/documentation/documentation.module').then(m => m.DocumentationModule),
      },
      {
        path: '**',
        loadChildren: () => import('src/app/custom-layout/guest/pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {
}
