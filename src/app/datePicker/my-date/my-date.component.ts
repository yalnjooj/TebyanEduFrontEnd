// import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
// import {
//   FormBuilder,
//   FormGroup,
//   Validators
// } from "@angular/forms";
// import { DateAdapter } from "@angular/material/core";
// import { MomentDateAdapter } from "@angular/material-moment-adapter";
// import {
//   DatetimeAdapter,
//   MAT_DATETIME_FORMATS,
//   MatDatetimepickerFilterType
// } from "@nader-eloshaiker/mat-datetimepicker";
// import { MomentDatetimeAdapter } from "@nader-eloshaiker/mat-datetimepicker-moment";
// import {
//   Moment,
//   utc
// } from "moment/moment";


// @Component({
//   selector: 'vex-my-date',
//   templateUrl: './my-date.component.html',
//   providers: [
//     {
//       provide: DateAdapter,
//       useClass: MomentDateAdapter
//     },
//     {
//       provide: DatetimeAdapter,
//       useClass: MomentDatetimeAdapter
//     },
//     {
//       provide: MAT_DATETIME_FORMATS,
//       useValue: {
//         parse: {
//           dateInput: "L",
//           monthInput: "MMMM",
//           timeInput: "LT",
//           datetimeInput: "L LT"
//         },
//         display: {
//           dateInput: "L",
//           monthInput: "MMMM",
//           datetimeInput: "L LT",
//           timeInput: "LT",
//           monthYearLabel: "MMM YYYY",
//           dateA11yLabel: "LL",
//           monthYearA11yLabel: "MMMM YYYY",
//           popupHeaderDateLabel: "ddd, DD MMM"
//         }
//       }
//     }
//   ],
//   styleUrls: ['./my-date.component.scss']
// })
// export class MyDateComponent implements OnInit {

//   @Input('myDate') myData: any;
//   @Output() date: EventEmitter<any> = new EventEmitter<any>();
  
//   group: FormGroup;


//   constructor(private fb: FormBuilder) {
    
//     this.group = fb.group({
//       date: [null, Validators.required],
//     });

//   }

//   ngOnInit(): void {
//     this.group = this.fb.group({
//       date: [new Date(this.myData.newDate == null? '': this.myData.newDate), Validators.required],
//     });

    
//   }

// }
