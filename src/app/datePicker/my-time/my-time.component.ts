// import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
// import {
//   FormBuilder,
//   FormGroup,
//   Validators
// } from "@angular/forms";
// import { DateAdapter } from "@angular/material/core";
// // import { MomentDateAdapter } from "@angular/material-moment-adapter";
// // import {
// //   DatetimeAdapter,
// //   MAT_DATETIME_FORMATS,
// //   MatDatetimepickerFilterType
// // } from "@nader-eloshaiker/mat-datetimepicker";
// // import { MomentDatetimeAdapter } from "@nader-eloshaiker/mat-datetimepicker-moment";
// // import {
// //   Moment,
// //   utc
// // } from "moment/moment";

// @Component({
//   selector: 'vex-my-time',
//   templateUrl: './my-time.component.html',
//   styleUrls: ['./my-time.component.scss']
// })
// export class MyTimeComponent {
  
//   @Input('myTime') myData: any;
//   @Output() time: EventEmitter<any> = new EventEmitter<any>();
  
//   group: FormGroup;


//   constructor(private fb: FormBuilder) { }  
  
//   ngOnInit(): void {

//     this.group = this.fb.group({
//       time: [new Date (new Date().toDateString() + ' ' + this.myData.newDate), Validators.required],
//     });
//   }

  
// }

