import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from 'src/@vex/vex.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { GraphQLModule } from 'src/app/graphql.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import  ar from 'date-fns/locale/ar';
import localeAr from "@angular/common/locales/ar";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

registerLocaleData(localeAr)

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}


@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "ar-SA"
    },
    {
      provide: MAT_DATE_LOCALE,
      useExisting: LOCALE_ID
    }
  ],
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // Vex
    VexModule,
    CustomLayoutModule,
    NgxSpinnerModule,
    GraphQLModule,
    // MatNativeDateModule,
    // ReactiveFormsModule,
    // FormsModule,
    MatDividerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
