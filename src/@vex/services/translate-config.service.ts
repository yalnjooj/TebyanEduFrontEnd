import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { map, first } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { LayoutService } from './layout.service';
@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translateService: TranslateService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigService) {

      
    translateService.addLangs(['en', 'ar']);
    translateService.setDefaultLang('en');


    const browserLang = translateService.getBrowserLang();
    const langChanged = localStorage.getItem("lang")
    const RTL = localStorage.getItem("rtl")

    if (!(langChanged && RTL)) {
      const crrentLang = browserLang.match(/en|ar/);
      switch (crrentLang[0]) {
        case 'en':
        case 'ar':
          switch (crrentLang[0]) {
            case 'en':
              localStorage.setItem("lang", crrentLang[0])
              localStorage.setItem("rtl", "ltr")
              break;
            case 'ar':
              localStorage.setItem("lang", crrentLang[0])
              localStorage.setItem("rtl", "rtl")
              break;
          }
          break;

        default:
          translateService.use('en');
          localStorage.setItem("rtl", "ltr")
          break;
      }


    } else {
      this.translateService.use(langChanged)
      localStorage.setItem("rtl", RTL)
    }

  }

  // isRTL$ = this.route.queryParamMap.pipe(
  //   map(paramMap => coerceBooleanProperty(paramMap.get('rtl'))),
  //   first()
  // );

  changeLanguage(type: any) {
    const langChanged = localStorage.getItem("lang")

    if (type === langChanged) return;

    this.translateService.use(type);

    localStorage.setItem('rtl', type == 'en'? 'ltr': 'rtl')
    localStorage.setItem("lang", type)
    

   // type == 'en' ? this.layoutService.enableRTL() : this.layoutService.disableRTL();
     location.reload()
  }

}
