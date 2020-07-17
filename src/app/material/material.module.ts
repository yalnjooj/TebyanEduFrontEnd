import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const material = [
  MatSliderModule,
  MatButtonModule,
  BrowserAnimationsModule
]

@NgModule({
  imports: [ material ],
  exports: [ material ]
})
export class MaterialModule { }
