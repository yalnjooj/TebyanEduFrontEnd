import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


const angularModule = [
  BrowserModule,
  FormsModule,
  HttpClientModule
];

@NgModule({
  imports: [ angularModule ],
  exports: [ angularModule ]
})
export class AngularModule { }
