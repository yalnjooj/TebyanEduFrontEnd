import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewImags } from './view-Imags.pipe';


@NgModule({
  declarations: [ViewImags],
  imports: [
    CommonModule
  ],
  exports: [ViewImags]
})
export class ViewImagsModule {
}
