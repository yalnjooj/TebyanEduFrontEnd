import { Queries } from './../../graphql/queries';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogSingoutComponent } from 'src/app/dialogs/singout/dialogSingout/dialog.singout.component';
import { IslamicService } from '@syncfusion/ej2-angular-calendars';
import { L10n } from '@syncfusion/ej2-base';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Mutations } from 'src/app/graphql/mutations';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  selectedDate: Date;
}
export interface JSONUser {
  selectedDate: string;
}


@Component({
  selector: 'app-dashboard',
  providers: [IslamicService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toggle = true;
  public user: any;
  public JSONData: JSONUser = JSON.parse('{ "selectedDate": "2018-12-18T08:56:00+00:00"}');
  public model_result: string = JSON.stringify(this.JSONData);
  selectedDate
  showFiller = false;
  // user: Object = {
  //   id: String,
  //   role: String,
  //   email: String
  // }

  public minDate: Date = new Date("1/1/2010");
  public maxDate: Date = new Date("1/1/2070");
  public dateValue: Date = new Date("27/7/2020");
  public multiSelect: Boolean = false;
  public weekStart: number = 0;

  constructor(private cookieService: CookieService, private slimLoadingBarService: SlimLoadingBarService, private dialog: MatDialog, private router: Router, private apollo: Apollo, private ngxSpinnerService: NgxSpinnerService) {

    this.apollo.watchQuery({
      query: gql`
      query{
        currentUser{
          id
          email
        }
    } 
      `
    }).valueChanges.subscribe(x => {

    })
 
  }

  DATE: any = {
    DAY_STRING: String,
    DAY_NUMBER: String,
    MONTH_STRING: String,
    MONTH_NUMBER: String,
    YEAR_NUMBER: String,
    TAG: String,
    getFullDateNumber: () => {
      return this.DATE.YEAR_NUMBER + '/' + this.DATE.MONTH_NUMBER + '/' + this.DATE.DAY_NUMBER + this.DATE.TAG
    },
    getFullDateString: () => {
      // return this.DATE.YEAR_NUMBER + '/' + this.DATE.MONTH_STRING + '/' + this.DATE.DAY_NUMBER + ' ' + this.DATE.DAY_STRING + ' ' + this.DATE.TAG
      return this.DATE.DAY_STRING + ' ' + this.DATE.DAY_NUMBER + '/' + this.DATE.MONTH_STRING + '/' + this.DATE.YEAR_NUMBER + this.DATE.TAG
    }


  }

  timeNow;
  dateNow;
  dateNowHijri;
  Change;
  Change2;

  time0 = setInterval(() => {
    this.timeNow = new Date().toLocaleTimeString();
    this.dateNow = new Date().toLocaleDateString();
    this.dateNowHijri

  }, 1000);


  ngOnInit(): void {
    this.user = this.JSONData;

    L10n.load({
      'ar': {
        'calendar': { today: "اليوم" }
      }
    });

    this.ngxSpinnerService.show();





    this.ngxSpinnerService.hide();
  }




  logout() {
    let f = this.dialog.open(DialogSingoutComponent, {
      width: '500px'
    })


    f.afterClosed().subscribe(data => {
      switch (data) {
        case true:
          this.apollo.watchQuery({
            query: gql`
              query{
                logout
              }
            `
          }).valueChanges.subscribe(data => {
            this.router.navigate(['/home'])
          }, err => { console.log(err) })
          break;

        case false:
          break;
      }


    })



  }

  changeDateFormat(oldDate) {

    let monthsNames = ["المُحَرَّم", "صَفَر ", "رَبيع الاوَّل", "رَبيع الآخِر", "جُمادى الأولى", "جُمادى الآخِرة", "رَجَب", "شَعبان", "رَمَضان", "شَوّال", "ذو القَعدة", "ذو الحِجّة"]

    let newDateFormat;
    let digitSelected;


    monthsNames.forEach((value: string, index: number, array: string[]) => {

      if (oldDate.includes(value)) {
        this.DATE.MONTH_STRING = monthsNames[index];

        switch (index) {
          case 0:
            digitSelected = "١";
            break;
          case 1:
            digitSelected = "٢";
            break;
          case 2:
            digitSelected = "٣";
            break;
          case 3:
            digitSelected = "٤";
            break;
          case 4:
            digitSelected = "٥";
            break;
          case 5:
            digitSelected = "٦";
            break;
          case 6:
            digitSelected = "٧";
            break;
          case 7:
            digitSelected = "٨";
            break;
          case 8:
            digitSelected = "٩";
            break;
          case 9:
            digitSelected = "١٠";
            break;
          case 10:
            digitSelected = "١١";
            break;
          case 11:
            digitSelected = "١٢";
            break;
        }
        newDateFormat = oldDate.replace(monthsNames[index], digitSelected)

        return;
      }

    })

    if (newDateFormat == undefined) return;

    // ,
    newDateFormat = newDateFormat.replace(',', '')
    // هـ
    newDateFormat = newDateFormat.replace('هجري', 'هـ')
    // to array
    newDateFormat = newDateFormat.split(' ')

    // Day Of Week **STRING**
    this.DATE.DAY_STRING = newDateFormat[0]

    // Day Of Week **NUMBERS**
    this.DATE.DAY_NUMBER = newDateFormat[1]

    // Month **NUMBERS**
    this.DATE.MONTH_NUMBER = newDateFormat[2]

    // Year **NUMBERS**
    this.DATE.YEAR_NUMBER = newDateFormat[3]

    // هـ tag
    this.DATE.TAG = newDateFormat[4]


    this.Change2 = this.DATE.getFullDateNumber()
    this.Change = this.DATE.getFullDateString()

  }

 

}

