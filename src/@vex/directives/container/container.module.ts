import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerDirective } from './container.directive';
import { CoorDinatorList } from './coorDinatorList.directive';


@NgModule({
  declarations: [ContainerDirective, CoorDinatorList],
  imports: [
    CommonModule
  ],
  exports: [ContainerDirective, CoorDinatorList]
})
export class ContainerModule {
}
