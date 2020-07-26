import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const angularModule = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [ angularModule ],
  exports: [ angularModule ]
})
export class AngularModule { }
